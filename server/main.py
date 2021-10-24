import uvicorn
from base import *
from fastapi import FastAPI


app = FastAPI()


@app.post("/api/pridict-number")
def pridict(pridict: PridictModel):
    corrdinate_offset = pridict.corrdinate_offet
    print(corrdinate_offset)


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
