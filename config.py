from googleapiclient.discovery import build

class Config:
    def __init__(self) -> None:
        # AIzaSyCnqNweuZd37APrxuoQMmfIL7ORJduK9zU
        # AIzaSyDpwjPHs8aj8ARu38KAJ5m2PI3iz3_pNQk
        self.api_key = 'AIzaSyCnqNweuZd37APrxuoQMmfIL7ORJduK9zU'
        self.youtube = build('youtube', 'v3', developerKey=self.api_key)