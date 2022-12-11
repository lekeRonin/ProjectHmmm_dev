<template>

  <el-upload action="#"
             list-type="picture-card"
             :limit="1"
             :file-list="fileList"
             :on-preview="onPreview"
             :on-remove="onRemove"
             :on-change="onChange"
             :before-upload="onBeforeUpload"
             :http-request="onHttpRequest"
             :class="objClass">
    <i class="el-icon-circle-close" />
    <i class="el-icon-plus" />
    <!-- 弹框 -->
    <el-dialog :visible="isShow"
               title="预览图片"
               width="30%"
               @close="onClose">
      <img :src="imgUrl"
           style="width:100%" />
    </el-dialog>
  </el-upload>

</template>

<script>
import COS from 'cos-js-sdk-v5'
const cos = new COS({
  SecretId: 'AKIDQp7zoEv2mjaMu06VSCbNB2n1bg9LTlEW',
  SecretKey: 'kNp1ynS731qbUmB1ipaJxjaO0YINQL8o'
})
export default {
  name: 'ImageUpload',
  data () {
    return {
      fileList: [],
      isShow: false,
      imgUrl: '',
      currUid: '',
      percentage: 0,
      objClass: {
        upLoadShow: true,
        upLoadHide: false
      }
    }
  },
  methods: {
    // file就是预览的图片信息
    onPreview (file) {
      this.imgUrl = file.url
      this.isShow = true
    },
    // 删除
    onRemove (file, fileList) {
      this.fileList = []
      this.objClass.upLoadShow = true // 删除图片后显示上传框
      this.objClass.upLoadHide = false
    },
    // 文件状态改变的钩子 添加文件 上传成功和失败都会被调用
    onChange (file, fileList) {
      // if (fileList) {
      //   this.fileList = fileList.map(item => item)
      // }
      this.objClass.upLoadHide = true // 上传图片后置upLoadHide为真，隐藏上传框
      this.objClass.upLoadShow = false
      this.fileList = fileList.map(item => item)
      //   console.log(this.fileList[0].url)
      this.$emit('imgURL', this.fileList[0].url)
    },
    // 文件上传之前会执行的钩子函数
    onBeforeUpload ({ size, type, uid }) {
      // 检查文件的类型
      const types = [
        'image/jpeg',
        'image/gif',
        'image/bmp',
        'image/png',
        'image/webp'
      ]
      if (!types.includes(type)) {
        this.$message.warning(`您上传的文件类型${type}不合法，请重新上传`)
        // return Promise.reject('失败')
        return false
      }

      // 检查文件的大小
      const maxSize = 5 * 1024 * 1024
      if (size > maxSize) {
        this.$message.error('您上传的文件过大，请重新上传')
        return false
      }

      // 记录一下当前上传的文件的uid
      this.currUid = uid
      // 检查通过一定要返回true
      console.log('检查通过')
      return true
    },
    onHttpRequest (params) {
      this.isShowPrecent = true
      // this.isShowUpload = false
      // params 里面的 file 属性是要真正上传到腾讯云服务器的文件
      const file = params.file

      // 腾讯云 sdk监听上传进度 上传简单文件
      cos.putObject(
        {
          Bucket: 'test1-1315219570' /* 填入您自己的存储桶，必须字段 */,
          Region: 'ap-nanjing' /* 存储桶所在地域，例如ap-beijing，必须字段 */,
          Key: file.name /* 存储在桶里的对象键（例如1.jpg，a/b/test.txt），必须字段 */,
          Body: file /* 必须，上传文件对象，可以是input[type="file"]标签选择本地文件后得到的file对象 */,

          // 监听上传图片期间的进度条回调
          onProgress: progressData => {
            // loaded 加载了多少
            // total 上传的文件总共有多少
            // speed 速度的意思
            // percent 上传的百分比数据
            // console.log(JSON.stringify(progressData))
            this.percentage = Math.ceil(progressData.percent * 100)
          }
        },
        (err, data) => {
          // console.log(err || data)
          if (!err && data.statusCode === 200) {
            this.fileList = this.fileList.map(item => {
              if (item.uid === this.currUid) {
                return { url: 'http://' + data.Location, upload: true }
              }
              return item
            })

            // 上传结束
            setTimeout(() => {
              // 关闭进度条显示
              this.isShowPrecent = false
              // this.isShowUpload = false

              // 进度条进度归0
              this.percentage = 0
            }, 1500)
          }
        }
      )
    },
    // 关闭弹框
    onClose () {
      this.isShow = false
      this.imgUrl = ''
    }
  }
}
</script>

  <style scoped lang="scss">
// 删除按钮
.el-icon-circle-close {
  position: relative;
  left: 66px;
  top: -28px;
  font-size: 18px;
}
// 添加按钮
.el-icon-plus {
  position: relative;
  left: -7px;
}
</style>
