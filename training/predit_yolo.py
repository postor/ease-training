import os
import gluoncv as gcv
import cv2
import mxnet as mx

from mxnet import gluon
from gluoncv import model_zoo, data, utils
from classes import classesNames
# print(classesNames)
net = gcv.model_zoo.get_model(
    'yolo3_darknet53_custom', classes=classesNames, pretrained_base=False)
net.load_parameters('parameters/yolo3_darknet53_custom_0170_0.5288.params')

dirName = 'test'
directory = os.fsencode(dirName)

for file in os.listdir(directory):
    filename = os.fsdecode(file)
    frame = os.path.join(dirName, filename)
    print(frame)
    x, orig_img = gcv.data.transforms.presets.ssd.load_test(frame, 416)
    box_ids, scores, bboxes = net(x)
    ax = utils.viz.cv_plot_bbox(
        orig_img, bboxes[0], scores[0], box_ids[0], class_names=net.classes, thresh=0.5)
    cv2.imshow('image', orig_img[..., ::-1])
    cv2.waitKey(0.1)
    cv2.imwrite(os.path.join('predicted', filename.split(
        '.')[0] + '_result.jpg'), orig_img[..., ::-1])

cv2.destroyAllWindows()
