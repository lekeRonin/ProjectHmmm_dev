<template>
  <div class="container" :key="key">
    <el-card>
      <!-- 顶部提示 -->

      <el-row>
        <el-col :span="24" class="top_title"> 试题录入</el-col>
      </el-row>
      <hr class="hr-line" />
      <!-- 顶部提示 end -->
      <!-- 顶部搜索表单 -->
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <!-- 学科 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="120px" prop="subjectID" label="学科：">
              <el-select
                style="width: 100%"
                v-model="form.subjectID"
                placeholder="请选择"
                @change="onSubjectChange"
              >
                <el-option
                  v-for="(item, index) in subjects"
                  :key="index"
                  :label="item.subjectName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 目录 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="120px" prop="catalogID" label="目录：">
              <el-select
                style="width: 100%"
                v-model="form.catalogID"
                placeholder="请选择"
                @change="onDirectoryChange"
              >
                <el-option
                  v-for="(item, index) in directory"
                  :key="index"
                  :label="item.directoryName"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 试题类型 -->
        <el-row>
          <el-col :span="8">
            <el-form-item
              label-width="120px"
              prop="enterpriseID"
              label="企业："
            >
              <el-select
                style="width: 100%"
                v-model="form.enterpriseID"
                placeholder="请选择"
                @change="onDirectoryChange"
              >
                <el-option
                  v-for="(item, index) in companyList"
                  :key="index"
                  :label="item.company"
                  :value="item.id"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 城市 -->
        <el-row>
          <el-col :span="8">
            <el-form-item
              class="city-box"
              label-width="120px"
              prop="province"
              label="城市："
            >
              <el-select
                class="city-1"
                v-model="form.province"
                placeholder="请选择"
                @change="onProvinceChange"
              >
                <el-option
                  v-for="(item, index) in province"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
              <el-select
                class="city-2"
                v-model="form.city"
                placeholder="请选择"
                @change="onDirectoryChange"
              >
                <el-option
                  v-for="(v, k, i) in citys"
                  :key="i"
                  :label="v"
                  :value="v"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 方向 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="120px" prop="direction" label="方向：">
              <el-select
                style="width: 100%"
                v-model="form.direction"
                placeholder="请选择"
                @change="onDirectoryChange"
              >
                <el-option
                  v-for="(item, index) in direction"
                  :key="index"
                  :label="item"
                  :value="item"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <!-- 题型 -->
        <el-row>
          <el-col>
            <el-form-item label-width="120px" label="题型：">
              <el-radio v-model="form.questionType" label="1">单选</el-radio>
              <el-radio v-model="form.questionType" label="2">多选</el-radio>
              <el-radio v-model="form.questionType" label="3">简答</el-radio>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 难度 -->
        <el-row>
          <el-col>
            <el-form-item label-width="120px" label="难度：">
              <el-radio v-model="form.difficulty" label="1">简单</el-radio>
              <el-radio v-model="form.difficulty" label="2">一般</el-radio>
              <el-radio v-model="form.difficulty" label="3">困难</el-radio>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 题干 -->
        <el-row>
          <el-col>
            <el-form-item label-width="120px" prop="question" label="题干：">
              <quill-editor
                class="quill-editor"
                ref="myTextEditor"
                v-model="form.question"
                style="height: 200px"
              ></quill-editor>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 选项 -->

        <!-- 单选 -->
        <template v-if="form.questionType === '1'">
          <div v-for="(item, index) in arr" :key="index">
            <el-row v-if="index < 4">
              <el-col>
                <el-form-item label-width="120px" label="选项：">
                  <el-row>
                    <el-col :span="1">
                      <el-radio :label="index" v-model="radio"
                        >{{ item.code }}：</el-radio
                      >
                    </el-col>
                    <el-col :span="5">
                      <el-input v-model="item.title"></el-input>
                    </el-col>
                    <el-col :span="10">
                      <el-upload
                        class="upload-demo"
                        action="#"
                        multiple
                        :limit="3"
                      >
                        <el-button class="upload_btn">点击上传</el-button>
                      </el-upload>
                    </el-col>
                  </el-row>
                </el-form-item>
              </el-col>
            </el-row>
          </div>
          <el-row>
            <el-col>
              <el-button
                class="add_btn"
                type="danger"
                size="small"
                @click="addItem"
                disabled
                >+增加选项与答案</el-button
              >
            </el-col>
          </el-row>
        </template>

        <!-- 多选 -->
        <template v-if="form.questionType === '2'">
          <div v-for="(item, index) in arr" :key="index">
            <el-checkbox-group v-model="checkList">
              <el-row v-if="index < questionIndex">
                <el-col>
                  <el-form-item label-width="120px" label="选项：">
                    <el-row>
                      <el-col :span="1">
                        <el-checkbox :label="index">{{
                          item.code
                        }}</el-checkbox>
                      </el-col>
                      <el-col :span="5">
                        <el-input v-model="item.title"></el-input>
                      </el-col>
                      <el-col :span="10">
                        <el-upload
                          class="upload-demo"
                          action="#"
                          multiple
                          :limit="3"
                        >
                          <el-button class="upload_btn">点击上传</el-button>
                        </el-upload>
                      </el-col>
                    </el-row>
                  </el-form-item>
                </el-col>
              </el-row>
            </el-checkbox-group>
          </div>
          <el-row>
            <el-col>
              <el-button
                class="add_btn"
                type="danger"
                size="small"
                @click="addItem"
                >+增加选项与答案</el-button
              >
            </el-col>
          </el-row>
        </template>

        <!-- 解析视频 -->
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="120px" label="解析视频：">
              <el-input v-model="form.videoURL"></el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 选项 -->
        <el-row>
          <el-col>
            <el-form-item label-width="120px" prop="answer" label="答案解析：">
              <quill-editor
                ref="myTextEditor"
                class="quill-editor"
                v-model="form.answer"
                style="height: 200px"
              ></quill-editor>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 题目备注： -->
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="120px" label="题目备注：">
              <el-input
                type="textarea"
                :rows="2"
                resize="none"
                placeholder="请输入内容"
                v-model="form.remarks"
              >
              </el-input>
            </el-form-item>
          </el-col>
        </el-row>

        <!-- 题目标签： -->
        <el-row>
          <el-col :span="8">
            <el-form-item label-width="120px" label="题目标签：">
              <el-select
                v-model="form.tags"
                multiple
                allow-create
                placeholder="请选择"
                style="width: 100%"
              >
                <el-option
                  v-for="item in tagList"
                  :key="item.tagName"
                  :label="item.tagName"
                  :value="item.tagName"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-form-item label-width="120px" label="">
          <el-button
            :type="$route.query.id ? 'success ' : 'primary'"
            @click="onClick($event)"
            >{{ $route.query.id ? "确认修改" : "确认提交" }}</el-button
          >
        </el-form-item>
      </el-form>

      <!-- 顶部搜索表单 end -->

      <!-- tab标签页  -->
    </el-card>
  </div>
</template>

<script>
// 富文本编辑器
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";
import { quillEditor } from "vue-quill-editor";

// 企业接口
import { list } from "../../api/hmmm/companys";
// 题库接口
import {
  baseDetailList,
  updateQuestionList,
  addQuestionList,
} from "@/api/hmmm/questions";
// 导入城市和区域/县
import { provinces, citys } from "@/api/hmmm/citys";
// 标签接口
import { getTagList } from "@/api/hmmm/tags";
// 学科接口
import { getSubjects } from "@/api/hmmm/subjects";
// 目录接口
import { getDirectorys } from "@/api/hmmm/directorys";
// 导入一个对象
import { array } from "../../api/hmmm/constants";

export default {
  /*
  单选 ---> 1
  多选 ---> 2
  简单 ---> 3
   */
  // chkState 1 通过 2 不通过 chkState:0 待审核
  // publishState		1 上架 0 下架
  data() {
    return {
      key: 1,
      // 复选框列表
      checkList: [],
      // 单选
      radio: "",
      // 选项存储的index
      questionIndex: 4,
      // 存储选项的数组
      arr: array,
      // 企业列表
      companyList: [],
      // 标签页活动值
      activeName: "all",
      // 预览时传入子组件的试题
      questionItem: {},
      // 试题预览
      dialogVisible: false,
      // 题库列表
      questionList: [],
      // 区域列表
      citys: [],
      // 城市列表
      province: provinces(),
      // 标签列表
      tagList: [],
      // 录入人列表
      userList: [],
      // 方向
      direction: [
        "o2o",
        "外包服务",
        "企业服务",
        "互联网金融",
        "企业咨询",
        "互联网",
        "电子商务",
        "其他",
      ],
      // 试题类型
      difficulty: {
        1: "简单",
        2: "一般",
        3: "困难",
      },
      // 难度
      questionType: {
        1: "单选",
        2: "多选",
        3: "简答",
      },
      // 二级目录列表
      directory: [],
      // 学科列表
      subjects: [],
      // 查询信息
      form: {
        // number: null, // 试题编号后台自动生成（忽略）
        subjectID: "", //学科
        catalogID: "", // 目录
        enterpriseID: "", // 企业
        province: "", //企业所在地省份
        city: "", // 企业所在城市
        direction: "", // 	方向
        questionType: "1", // 题型
        difficulty: "1", //难度
        question: "", // 题干
        // 选项
        options: [],
        videoURL: " ", // 解析视频
        answer: "", // 答案解析
        remarks: "", //	题目备注
        tags: [], // 试题标签
      },
      form2: {
        // number: null, // 试题编号后台自动生成（忽略）
        subjectID: "", //学科
        catalogID: "", // 目录
        enterpriseID: "", // 企业
        province: "", //企业所在地省份
        city: "", // 企业所在城市
        direction: "", // 	方向
        questionType: "1", // 题型
        difficulty: "1", //难度
        question: "", // 题干
        // 选项
        options: [],
        videoURL: "", // 解析视频
        answer: "", // 答案解析
        remarks: "", //	题目备注
        tags: [], // 试题标签
      },
      rules: {
        subjectID: [{ required: true, message: "请选择学科" }],
        catalogID: [{ required: true, message: "请选择目录" }],
        enterpriseID: [{ required: true, message: "请选择企业" }],
        province: [{ required: true, message: "请选择地区" }],
        direction: [{ required: true, message: "请选择方向" }],
        question: [{ required: true, message: "请输入题干" }],
        answer: [{ required: true, message: "请输入答案解析" }],
        videoURL: [{ required: true, message: "请输入解析视频地址" }],
      },
    };
  },
  methods: {
    // 🌈 获取题目详情
    async getQuestionsInfo() {
      if (this.$route.query.id) {
        const { data: res } = await baseDetailList({
          id: this.$route.query.id,
        });
        // 数据替换到 form
        this.form = res;
        // 标签改成数组
        this.form.tags = res.tags.split(",");
        this.questionIndex = this.form.options.length;
        // 重新加载添加按钮所需的容器
        const array1 = array;
        // 对添加按钮的数据进行处理
        const newArr = array1.splice(+this.form.options.length);
        this.arr = this.form.options.concat(newArr);

        // 开始获取目录
        const { data } = await getDirectorys({
          subjectID: this.form.subjectID,
        });
        this.directory = data.items;

        switch (this.form.questionType) {
          // 单选
          case "1":
            this.form.options.forEach((item, index) => {
              if (item.isRight === 1) {
                this.radio = index;
              }
            });
            break;
          // 多选
          case "2":
            this.form.options.forEach((item, index) => {
              if (item.isRight === 1) {
                this.checkList.push(index);
              }
            });
            break;
        }
      }
    },

    onClick(e) {
      this.$refs.form.validate(async (valid) => {
        if (!valid) {
          return false;
        } else {
          switch (e.target.innerText) {
            case "确认提交":
              this.onSubmit();
              this.$message.success("添加成功");
              break;

            case "确认修改":
              // 标签转字符串
              this.form.tags = this.form.tags.join(",");
              // 试题选项操作 处理数据
              switch (this.form.questionType) {
                // 单选
                case "1":
                  const optionArr = this.arr.slice(0, 4);
                  // 判断默认勾选
                  optionArr.forEach((item, index) => {
                    if (index === this.radio) {
                      item.isRight = true;
                    } else {
                      item.isRight = false;
                    }
                  });
                  this.form.options = optionArr.reverse();
                  break;

                // 多选的情况
                case "2":
                  const arr = this.arr.slice(0, this.questionIndex);
                  // 判断默认勾选
                  for (let i = 0; i < arr.length; i++) {
                    this.checkList.forEach((item) => {
                      if (i === item) {
                        arr[i].isRight = true;
                      }
                    });
                  }
                  this.form.options = arr.reverse();
                  break;
              }
              const data = await updateQuestionList(this.form);
              console.log(data);
              this.$message.success("修改成功");
              break;
          }
          this.$router.push("list");
        }
      });
    },

    //  提交选项
    async onSubmit() {
      // 标签转字符串
      this.form.tags = this.form.tags.join(",");
      // 试题选项操作 处理数据
      switch (this.form.questionType) {
        // 单选
        case "1":
          const optionArr = this.arr.slice(0, 4);
          // 判断默认勾选
          optionArr.forEach((item, index) => {
            if (index === this.radio) {
              item.isRight = true;
            } else {
              item.isRight = false;
            }
          });
          this.form.options = optionArr;
          break;

        // 多选的情况
        case "2":
          const arr = this.arr.slice(0, this.questionIndex);
          // 判断默认勾选
          for (let i = 0; i < arr.length; i++) {
            this.checkList.forEach((item) => {
              if (i === item) {
                arr[i].isRight = true;
              }
            });
          }
          this.form.options = arr;
          break;
      }
      const data = await addQuestionList(this.form);
    },

    // 🌈 添加选项
    addItem() {
      if (this.questionIndex > 25) {
        return;
      }
      this.questionIndex++;
    },

    // 🌈 获取企业列表
    async getCompanyList() {
      const { data: res } = await list({
        page: 1,
        pagesize: 99,
      });
      this.companyList = res.items;
    },

    // 🌈 当市级发生变化时触发的函数
    onProvinceChange(val) {
      this.form.city = "";
      this.citys = citys(val);
    },

    // 🌈 目录选择框发生变化后触发的函数
    onDirectoryChange(val) {
      // 获取标签
      this.getTagList();
    },

    // 🌈 学科选择框发生变化后触发的函数
    async onSubjectChange(val) {
      this.form.tags = null;
      this.form.catalogID = null;
      const { data: res } = await getDirectorys({ subjectID: val });
      this.directory = res.items;
      this.tagList = [];
    },

    // 🌈 获取学科列表
    async getQuestionsList() {
      try {
        const { data: res } = await getSubjects({ page: 1, pagesize: 100 });
        this.subjects = res.items;
      } catch (error) {}
    },

    // 🌈 获取标签列表
    async getTagList() {
      const { data: res } = await getTagList({
        subjectID: this.form.subjectID,
      });
      if (res.items.length) {
        console.log(res.items)
        this.tagList = res.items;
      } else {
        this.tagList = [];
      }
    },

    // 点击图片回到顶部方法，加计时器是为了过渡顺滑
    backTop() {
      const that = this;
      let timer = setInterval(() => {
        let ispeed = Math.floor(-that.scrollTop / 5);
        document.documentElement.scrollTop = document.body.scrollTop =
          that.scrollTop + ispeed;
        if (that.scrollTop === 0) {
          clearInterval(timer);
        }
      }, 16);
    },

    // 为了计算距离顶部的高度，当高度大于60显示回顶部图标，小于60则隐藏
    scrollToTop() {
      const that = this;
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      that.scrollTop = scrollTop;
      if (that.scrollTop > 60) {
        that.btnFlag = false;
      } else {
        that.btnFlag = false;
      }
    },
  },
  beforeDestroy() {
    ++this.key;
  },

  mounted() {
    // 监听窗口的改变事件
    window.addEventListener("scroll", this.scrollToTop);
  },
  destroyed() {
    // 移除窗口的改变事件
    window.removeEventListener("scroll", this.scrollToTop);
  },
  created() {
    // 如果修改页面则返回顶部录入试题页面默认是在顶部 不需要修改
    if (this.$route.query.id) {
      // 返回顶部
      this.backTop();
    }
    this.date = Date.now();
    // // 获取题目详情
    this.getQuestionsInfo();
    // 获取企业列表
    this.getCompanyList();
    // 获取学科列表
    this.getQuestionsList();
  },
  beforeUpdata() {},
  watch: {
    "$route.query.id"() {
      ++this.key;
      this.$router.go(0);
      this.getQuestionsInfo();
    },
  },
  components: {
    quillEditor,
  },
};
</script>

<style scoped lang="scss">
.el-form-item__label {
  width: 200px !important;
}
.hr-line {
  color: #ebeef5;
}
.top_title {
  margin: 20px 0px 20px 0px;
}
.el-card {
  .upload-demo {
    margin-left: 20px;
    .upload_btn {
      margin-top: -10px;
      height: 50px;
    }
  }
  .add_btn {
    margin: 10px 0px 20px;
    margin-left: 120px;
  }
  .el-form {
    margin-top: 30px;
  }
  .city-1 {
    width: 48%;
    margin-right: 4%;
  }
  .city-2 {
    width: 48%;
  }
  margin: 10px;
  padding-bottom: 200px;
  .quill-editor {
    margin-bottom: 60px;
  }
}
</style>
