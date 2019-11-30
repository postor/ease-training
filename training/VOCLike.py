from gluoncv.data import VOCDetection


class VOCLike(VOCDetection):    
    NUM_CLASS = 18
    BASE_DIR = '.'
    @property
    def classes(self):
        """Category names."""
        return ('jyz',
                'sflxccz',
                'fxjgb',
                'fzc',
                'xcxj',
                'xdzc',
                'szxjgb',
                'fhjyz',
                'jyh',
                'sflzc',
                'sflnzcz',
                'dpjjyh',
                'bsp',
                'bxgqnq',
                'djlsbhm',
                'sjlb',
                'gjxqnc',
                'sxtzb')
