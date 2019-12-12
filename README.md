# ease training

to train at ease, thanks to [mxnet gluon](https://gluon-cv.mxnet.io/index.html)

I want to train my custom data and compare performance among different models, so I start this project

## features

### object detection

- [ ] load voc like dataset from zip
- [ ] train with SSD / Faster-RCNN / YOLOv3
- [ ] generate test code for image / video
- [ ] realtime mAP chart
- [ ] model zoo chart
- [ ] dataset builder

### semantic segmentation

- [ ] maybe later

## useage

```
./prepare.sh
docker-compose up -d
```

then open http://localhost:3000 (or replace localhost with lan IP)

![home](./screenshots/home.jpg)
![create dataset](./screenshots/create-dataset.jpg)
![training](./screenshots/training.jpg)
![epoch chart](./screenshots/epoch-chart.jpg)

## use docker only

prepare your custom dataset and map to `/dataset.zip` and map out where you generate `classes.py` and parameters:

```
docker run -it --rm --gpus all --shm-size=32G -v $(pwd)/parameters:/parameters -v $(pwd)/dataset.zip:/dataset.zip -v $(pwd):/out-classes postor/ease-training train_yolo3.py --gpus=0 --save-prefix=/parameters/

# or cache models and train with more params
docker run -it --rm --gpus all --shm-size=32G -v ~/.mxnet:/root/.mxnet -v $(pwd)/parameters:/parameters -v $(pwd)/dataset.zip:/dataset.zip -v $(pwd):/out-classes --shm-size 32G postor/ease-training train_yolo3.py --batch-size=2 --gpus=1,2 --lr=0.0001 --epochs=500 --network=darknet53 --save-prefix=/parameters/'
```

params refer https://gluon-cv.mxnet.io/build/examples_detection/index.html or [training/predict_yolo3.py](./training/predict.py)

after running, parameters shall be in your `$(pwd)/parameters` folder

to predict, you need some sample images, put them into a folder, like `$(pwd)/test`, run this to generate result to `$(pwd)/result`

```
docker run -it --rm --gpus all  -v $(pwd)/parameters:/training/parameters -v $(pwd)/test:/test -v $(pwd)/result:/result -v  --entrypoint python3 postor/ease-training predict_yolo3.py --input-folder=/test --output-folder=/result
```

then results shall appear in `$(pwd)/result` folder

### supported

* yolo3
    * darknet53
        * 320
        * 416
        * 608
    * mobilenet0.25
        * 320
        * 416
        * 608
    * mobilenet1.0
        * 320
        * 416
        * 608
* ssd
    * mobilenet0.25
        * 300
    * vgg16_atrous
        * 300
        * 512
    * mobilenet1.0
        * 512
    * resnet50_v1
        * 512