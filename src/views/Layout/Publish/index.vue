<template>
  <div class="publish-container">
    <el-card class="box-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>发布文章</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <el-form
        ref="form"
        :model="article"
        :rules="formRules"
        label-width="60px"
      >
        <el-form-item label="标题" prop="title">
          <el-input v-model="article.title" placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="内容" prop="content">
          <el-tiptap
            v-model="article.content"
            :extensions="extensions"
            height="350px"
            placeholder="请输入内容"
          ></el-tiptap>
        </el-form-item>
        <el-form-item label="封面">
          <el-radio-group v-model="article.type">
            <el-radio
              :label="item.type"
              v-for="(item, index) in coverType"
              :key="index"
              >{{ item.text }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道" prop="channel_id">
          <el-select v-model="article.channel" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channelList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onPublish(false)">发表</el-button>
          <el-button @click="onPublish(true)">存入草稿</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script>
import {
  getArticleChannels,
  addArticle,
  getArticle,
  updateArticle,
} from "@/api/article";
import { uploadImage } from "@/api/image";
import {
  ElementTiptap,
  Doc,
  Text,
  Paragraph,
  Heading,
  Bold,
  Underline,
  Italic,
  Image,
  Strike,
  ListItem,
  BulletList,
  OrderedList,
  TodoItem,
  TodoList,
  HorizontalRule,
  Fullscreen,
  Preview,
  CodeBlock,
} from "element-tiptap";
import "element-tiptap/lib/index.css";
export default {
  name: "PublishIndex",
  components: {
    "el-tiptap": ElementTiptap,
  },
  props: {},
  data() {
    return {
      article: {
        title: "", // 文章标题
        content: "", // 文章内容
        cover: {
          // 文章封面
          type: 0, // 封面类型 -1:自动，0-无图，1-1张，3-3张
          images: [], // 封面图片的地址
        },
      },
      formRules: {
        title: [
          { required: true, message: "请输入文章标题", trigger: "blur" },
          {
            min: 5,
            max: 30,
            message: "长度在 5 到 30 个字符",
            trigger: "blur",
          },
        ],
        content: [
          {
            validator(rule, value, callback) {
              console.log("content validator");
              if (value === "<p></p>") {
                // 验证失败
                callback(new Error("请输入文章内容"));
              } else {
                // 验证通过
                callback();
              }
            },
          },
          { required: true, message: "请输入文章内容", trigger: "blur" },
        ],
        channel_id: [{ required: true, message: "请选择文章频道" }],
      },
      channelList: [],
      coverType: [
        { text: "单图", type: 1 },
        { text: "三图", type: 3 },
        { text: "无图", type: 0 },
        { text: "自动", type: -1 },
      ],
      extensions: [
        new Doc(),
        new Text(),
        new Paragraph(),
        new Heading({ level: 3 }),
        new Bold({ bubble: true }), // 在气泡菜单中渲染菜单按钮
        new Image({
          uploadRequest(file) {
            let fd = new FormData();
            fd.append("image", file);
            return uploadImage(fd)
              .then((res) => {
                return res.data.data.url;
              })
              .catch((e) => {
                console.log(e);
              });
          },
        }),
        new Underline(), // 下划线
        new Italic(), // 斜体
        new Strike(), // 删除线
        new HorizontalRule(), // 华丽的分割线
        new ListItem(),
        new BulletList(), // 无序列表
        new OrderedList(), // 有序列表
        new TodoItem(),
        new TodoList(),
        new Fullscreen(),
        new Preview(),
        new CodeBlock(),
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getArticleChannelsEvent();
    const articleId = this.$route.query.id;
    if (articleId) {
      getArticle(articleId)
        .then((res) => {
          // 请求到的数据赋值给 this.article
          console.log(res.data.data);
        })
        .catch((e) => {
          console.log(e);
        });
    }
  },
  mounted() {},
  methods: {
    async getArticleChannelsEvent() {
      const result = await getArticleChannels();
      this.channelList.push(...result.data.data.channels);
    },

    onPublish(draft = false) {
      this.$refs.form.validate((valid) => {
        if (!valid) {
          console.log("error submit!!");
          return;
        }
        // 如果是修改文章，则执行修改操作，否则执行添加操作
        const articleId = this.$route.query.id;
        if (articleId) {
          // 执行修改操作
          updateArticle(articleId, this.article, draft).then((res) => {
            console.log(res);
            this.$message({
              message: `${draft ? "存入草稿" : "发布"}成功`,
              type: "success",
            });
            // 跳转到内容管理页面
            this.$router.push("/article");
          });
        } else {
          addArticle(this.article, draft).then((res) => {
            // 处理响应结果
            // console.log(res)
            this.$message({
              message: `${draft ? "存入草稿" : "发布"}成功`,
              type: "success",
            });
            // 跳转到内容管理页面
            this.$router.push("/article");
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="less"></style>