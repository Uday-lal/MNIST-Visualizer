import uvicorn
from base import *
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from scale_data import ScaleData
import pickle
import numpy
import pathlib
import os


app = FastAPI()
origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def prediction(data):
    scaled_data = numpy.array([data])
    cwd = pathlib.Path(
        __file__).parent.resolve()
    n_sample, nx, ny = scaled_data.shape
    scaled_data = scaled_data.reshape((n_sample, nx * ny))
    model_file = open(os.path.join(cwd, "mnist.pickle"), "rb")
    model = pickle.load(model_file)
    prediction_ = model.predict(scaled_data)
    return prediction_


@app.post("/api/pridict-number")
def pridict(pridict: PridictModel):
    corrdinate_offset = pridict.corrdinate_offet
    board_width = pridict.board_width
    board_height = pridict.board_height
    try:
        scale_data = ScaleData(
            mouse_pos=corrdinate_offset,
            grid_width=board_width,
            grid_height=board_height
        ).scale_img_data()
    except Exception:
        return {"prediction": None, "error": True}
    prediction_ = prediction(scale_data)

    predicted_number = int(prediction_[0])
    return {"prediction": predicted_number, "error": False}


if __name__ == "__main__":
    uvicorn.run("main:app", reload=True)
