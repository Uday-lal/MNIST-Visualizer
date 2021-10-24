import uvicorn
from base import *
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.post("/api/pridict-number")
def pridict(pridict: PridictModel):
    corrdinate_offset = pridict.corrdinate_offet
    print(pridict)
    return {"message": "done"}


if __name__ == "__main__":
    uvicorn.run("main:app", port=8000, reload=True)
