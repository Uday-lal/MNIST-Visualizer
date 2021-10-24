import mnist  # pip install mnist
from sklearn.svm import LinearSVC
import pickle

# MNIST module provide mnist dataset.
# But the problem is it has three dimensional array so you need to make it into correct shape before start using it.


def save_model(model_obj):
    """
    For saving the model
    :param model_obj: AI algorithm.
    :return: None
    """
    file = open("mnist.pickle", "wb")
    pickle.dump(model_obj, file)


def train_model(is_save=False):
    X_train = mnist.train_images()
    y_train = mnist.train_labels()
    X_test = mnist.test_images()
    y_test = mnist.test_labels()

    # Shaping the datasets
    n_sample, nx, ny = X_train.shape
    n_sample_test, nx_test, ny_test = X_test.shape
    clean_datasets = X_train.reshape((n_sample, nx * ny))
    clean_x_test = X_test.reshape((n_sample_test, nx_test * ny_test))

    # Start training
    svm = LinearSVC()
    print("Start traning...")
    svm.fit(clean_datasets, y_train)
    acc = svm.score(clean_datasets, y_train)
    if is_save:
        save_model(svm)
    return acc


def prediction(data):
    """
    Making prediction.
    :returns: list of predicted number
    :param data: Input data or testing data
    :return: list
    """
    file = open("mnist.pickle", "rb")
    model = pickle.load(file)
    predict = model.predict(data)
    return predict
