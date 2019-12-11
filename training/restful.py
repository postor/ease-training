import os
import time


RESTFUL_ENDPOINT = os.getenv('RESTFUL_ENDPOINT')
TRAIN_ID = int(os.getenv('TRAIN_ID'))


def update_working(working_status):
    if not RESTFUL_ENDPOINT:
      return
    cmd = 'curl -d \'{"working":%d}\' -H "Content-Type: application/json" -X PUT %s/train/%d' % (
        working_status, RESTFUL_ENDPOINT, TRAIN_ID)
    print(cmd)
    os.system(cmd)


def update_start():
    if not RESTFUL_ENDPOINT:
      return
    cmd = 'curl -d \'{"started_at":%d}\' -H "Content-Type: application/json" -X PUT %s/train/%d' % (
        int(time.time()), RESTFUL_ENDPOINT, TRAIN_ID)
    print(cmd)
    os.system(cmd)


def update_epoch(epoch_num, val_avg_time, m_ap):
    if not RESTFUL_ENDPOINT:
      return
    cmd = 'curl -d \'{"job_id":%d, "created_at":%d, "epoch_num":%d, "val_avg_time":%f, "m_ap":%f}\' -H "Content-Type: application/json" -X POST %s/epoch' % (
        TRAIN_ID, int(time.time()), epoch_num, val_avg_time, m_ap, RESTFUL_ENDPOINT)
    print(cmd)
    os.system(cmd)
