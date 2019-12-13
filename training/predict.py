import os
import gluoncv as gcv
import cv2
import mxnet as mx
import argparse

from mxnet import gluon
from gluoncv import model_zoo, data, utils
from classes import classesNames


def parse_args():
    parser = argparse.ArgumentParser(
        description='Train YOLO networks with random input shape.')
    parser.add_argument('--model', type=str, default='yolo3_darknet53_custom',
                        help="model name.")
    parser.add_argument('--data-shape', type=int, default=416,
                        help="Input data shape for evaluation, use 320, 416, 608... " +
                             "Training is with random shapes from (320 to 608).")
    parser.add_argument('--thresh', type=float, default=0.5,
                        help="predict thresh hold")
    parser.add_argument('--input-folder', type=str, default='test',
                        help="input folder, with images inside")
    parser.add_argument('--output-folder', type=str, default='result',
                        help="output folder, result will generate to")

    args = parser.parse_args()
    return args


if __name__ == '__main__':
    args = parse_args()

    net = gcv.model_zoo.get_model(
        '%s_custom' % (args.model), classes=classesNames, pretrained_base=False)
    net.load_parameters('parameters/%s_custom_best.params' % (args.model))

    dirName = args.input_folder
    directory = os.fsencode(dirName)

    for file in os.listdir(directory):
        filename = os.fsdecode(file)
        frame = os.path.join(dirName, filename)
        print(frame)
        x, orig_img = gcv.data.transforms.presets.ssd.load_test(
            frame, args.data_shape)
        box_ids, scores, bboxes = net(x)
        ax = utils.viz.cv_plot_bbox(
            orig_img, bboxes[0], scores[0], box_ids[0], class_names=net.classes, thresh=args.thresh)
        # cv2.imshow('image', orig_img[..., ::-1])
        # cv2.waitKey(1)
        cv2.imwrite(os.path.join(args.output_folder, filename.split(
            '.')[0] + '_result.jpg'), orig_img[..., ::-1])

    cv2.destroyAllWindows()
