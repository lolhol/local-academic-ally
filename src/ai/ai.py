import os
import time
from threading import Thread
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

from llama_index.llms.ollama import Ollama

FILEPATH = os.path.expanduser("~/AcamicAlly/coms.txt")

os.makedirs(os.path.dirname(FILEPATH), exist_ok=True)
with open(FILEPATH, 'a') as file:  # 'a' opens the file for appending without truncating it
    pass  # The file is created if it does not exist, without changing its contents if it does

llm = Ollama(model="mistral")

def read_file(path):
    if not os.path.isfile(path):
        with open(path, 'w') as file:
            file.write('')
    with open(path, 'r') as file:
        return file.read()

def write_file(path, content):
    with open(path, 'w') as file:
        file.write(content)

def start_ai_request(prompt):
    try:
        response = llm.complete(prompt)
        print(f"LLM Response: {response}")
        return response
    except Exception as e:
        print(f"Error during LLM request: {e}")
        return None

class FileModifiedHandler(FileSystemEventHandler):
    def on_modified(self, event):
        print(f"File modified: {event.src_path}")
        # Check if the modified file is exactly coms.txt
        if os.path.basename(event.src_path) == 'coms.txt':
            process_file(FILEPATH)

def process_file(filepath):
    print("Processing file...")
    content = read_file(filepath).strip().split("\n")
    if len(content) >= 3 and content[0].lower() == "input" and content[1].lower() == "generate":
        print("Valid input detected, sending to LLM...")
        response = start_ai_request(content[2])
        if response is not None:
            print("Received response from LLM.")
            # Assuming the response text is in a property named 'text'
            response_text = response.text if hasattr(response, 'text') else str(response)
            formatted_response = "output\nresponse\n" + response_text.replace("\n", " ")
            write_file(filepath, formatted_response)
        else:
            print("No response received from LLM.")
    else:
        print("Invalid input format.")

def start_thread():
    event_handler = FileModifiedHandler()
    observer = Observer()
    observer.schedule(event_handler, path=os.path.dirname(FILEPATH), recursive=False)
    observer.start()
    print(f"Observer started on {os.path.dirname(FILEPATH)}")
    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        observer.join()

if __name__ == "__main__":
    print("Starting thread...")
    my_thread = Thread(target=start_thread, daemon=True)
    my_thread.start()
    print("Thread started. Monitoring for file changes...")
    try:
        my_thread.join()
    except KeyboardInterrupt:
        print("Exiting program...")
