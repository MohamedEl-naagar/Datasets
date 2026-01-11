from argilla.client import Argilla
import argilla as rg
import pandas as pd

# Connect to Argilla
client = Argilla(
    api_url="http://localhost:6900",
    api_key="admin.apikey"
)

# Load JSON file (change lines=True if needed)
df = pd.read_json("bevatel_chat.json", lines=True)

# Create dataset
dataset = rg.FeedbackDataset.for_text_classification(
    labels=["complaint", "inquiry", "other"],
    multi_label=False
)

dataset.push_to_argilla(
    name="bevatel_chat_dataset",
    workspace="default"
)

# Add records
records = [
    rg.FeedbackRecord(fields={"text": row["text"]})
    for _, row in df.iterrows()
]

dataset.add_records(records)

print("Dataset uploaded successfully")
