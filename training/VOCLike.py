from gluoncv.data import VOCDetection
from classes import classesNames


class VOCLike(VOCDetection):
    NUM_CLASS = len(classesNames)
    BASE_DIR = '.'
    @property
    def classes(self):
        """Category names."""
        return tuple(classesNames)
