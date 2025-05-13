from fastapi import FastAPI, UploadFile, File
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from transformers import AutoTokenizer, AutoModelForSeq2SeqLM
import os

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Load model
model_name = "Mostafa33/arabic-summarizer"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForSeq2SeqLM.from_pretrained(model_name)

class TextRequest(BaseModel):
    text: str
HISTORY_FILE = "history.txt"


def summarize_text(text: str) -> str:
    inputs = tokenizer(text, return_tensors="pt", truncation=True)
    outputs = model.generate(
        inputs["input_ids"],
        max_length=128,
        num_beams=4,
        early_stopping=True
    )
    summary = tokenizer.decode(outputs[0], skip_special_tokens=True)
    save_to_history(text, summary)
    return summary

def save_to_history(original: str, summary: str):
    with open(HISTORY_FILE, "a", encoding="utf-8") as f:
        f.write("📝 النص:\n" + original.strip() + "\n")
        f.write("📌 الملخص:\n" + summary.strip() + "\n")
        f.write("=" * 40 + "\n")


@app.post("/summarize_text/")
async def summarize_text_endpoint(request: TextRequest):
    summary = summarize_text(request.text)
    return {"summary": summary}


@app.post("/summarize_file/")
async def summarize_file(file: UploadFile = File(...)):
    try:
        contents = await file.read()

        if file.filename.endswith(".txt"):
            text = contents.decode("utf-8")

        
        else:
            return JSONResponse(content={"error": "Unsupported file type"}, status_code=400)

        summary = summarize_text(text)
        return {"summary": summary}

    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)


@app.get("/history")
async def get_history():
    if not os.path.exists(HISTORY_FILE):
        return {"history": "لا يوجد سجل محفوظ بعد."}
    try:
        with open(HISTORY_FILE, "r", encoding="utf-8") as f:
            content = f.read()
        return {"history": content}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)

@app.delete("/history")
async def clear_history():
    try:
        if os.path.exists(HISTORY_FILE):
            os.remove(HISTORY_FILE)
        return {"message": "تم حذف السجل بنجاح."}
    except Exception as e:
        return JSONResponse(content={"error": str(e)}, status_code=500)
