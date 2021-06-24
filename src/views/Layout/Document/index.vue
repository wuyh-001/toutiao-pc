<template>
  <div class="article-container">
    <el-card class="filter-card">
      <div slot="header" class="clearfix">
        <!-- 面包屑路径导航 -->
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item to="/">首页</el-breadcrumb-item>
          <el-breadcrumb-item>内容管理</el-breadcrumb-item>
        </el-breadcrumb>
        <!-- /面包屑路径导航 -->
      </div>
      <!-- 数据筛选表单 -->
      <el-form ref="form" :model="form" label-width="40px" size="mini">
        <el-form-item label="状态">
          <el-radio-group v-model="form.status">
            <el-radio :label="null">全部</el-radio>
            <el-radio
              :label="statu.status"
              v-for="(statu, index) in articleStatus"
              :key="index"
              >{{ statu.text }}</el-radio
            >
          </el-radio-group>
        </el-form-item>
        <el-form-item label="频道">
          <el-select v-model="form.region" placeholder="请选择频道">
            <el-option label="全部" :value="null"></el-option>
            <el-option
              :label="channel.name"
              :value="channel.id"
              v-for="(channel, index) in channelList"
              :key="index"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="日期">
          <el-date-picker
            v-model="form.date"
            type="daterange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            value-format="yyyy-MM-dd"
          >
          </el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
      <!-- /数据筛选表单 -->
    </el-card>

    <el-card class="box-card">
      <div slot="header" class="clearfix">
        根据筛选条件共查询到 {{ totalCount }} 条结果：
      </div>
      <!-- 数据列表 -->
      <el-table
        :data="articles"
        stripe
        style="width: 100%"
        class="list-table"
        size="mini"
      >
        <el-table-column label="封面">
          <template slot-scope="scope">
            <img :src="scope.row.cover.images[0]" height="30" />
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题"></el-table-column>
        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-tag :type="articleStatus[scope.row.status].type">{{
              articleStatus[scope.row.status].text
            }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="pubdate" label="发布时间"> </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              circle
              icon="el-icon-edit"
              type="primary"
            ></el-button>
            <el-button
              size="mini"
              type="danger"
              icon="el-icon-delete"
              circle
              @click="deleteEvent(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- /数据列表 -->

      <!-- 列表分页 -->
      <el-pagination
        layout="prev, pager, next"
        background
        :total="totalCount"
        @current-change="currentEvent"
      >
      </el-pagination>
      <!-- /列表分页 -->
    </el-card>
  </div>
</template>

<script>
import { getArticles, getArticleChannels } from "@/api/article";
export default {
  name: "ArticleIndex",
  components: {},
  props: {},
  data() {
    return {
      form: {
        region: null,
        date: null,
        status: null,
      },
      totalCount: 2,
      status: null,
      channelList: [],
      articles: [],
      per_page: 10,
      page: 1,
      articleStatus: [
        { status: 0, text: "草稿", type: "info" }, // 0
        { status: 1, text: "待审核", type: "" }, // 1
        { status: 2, text: "审核通过", type: "success" }, // 2
        { status: 3, text: "审核失败", type: "warning" }, // 3
        { status: 4, text: "已删除", type: "danger" }, // 4
      ],
    };
  },
  computed: {},
  watch: {},
  created() {
    this.getArticleList();
    this.getArticleChannelsEvent();
  },
  mounted() {},
  methods: {
      deleteEvent(id){
        //   删除成功之后，为了更新试图，，可以重新获取文章列表数据 this.getArticleList()
          console.log('delete:',id)
      },
    currentEvent(currentPage) {
      this.page = currentPage;
    },
    onSubmit() {
      console.log("submit:", this.form);
      //   this.getArticleList();
    },
    async getArticleChannelsEvent() {
      const result = await getArticleChannels();
      this.channelList.push(...result.data.data.channels);
    },
    getArticleList() {
    //   const result = await getArticles({
    //     page: this.page,
    //     per_page: this.per_page,
    //     status: this.form.status,
    //     begin_pubdate: this.form.date ? this.form.date[0] : null,
    //     end_pubdate: this.form.date ? this.form.date[1] : null,
    //   });
      let articles = [
        {
          id: 1,
          title: "ceshi11111",
          status: 2,
          cover: {
            images: [
              "https://img1.baidu.com/it/u=3031084643,1334557890&fm=26&fmt=auto&gp=0.jpg",
            ],
          },
          pubdate: "2021-06-24",
        },
        {
          id: 2,
          title: "ceshi2222",
          status: 0,
          cover: {
            images: [
              "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fi.keaitupian.net%2Fup%2Fbd%2F57%2Fa3%2Fa438d76ba4b5dc8fffd1bff704a357bd.jpg&refer=http%3A%2F%2Fi.keaitupian.net&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1627093884&t=5d9f285c4f3c8d3ed2e84663a8b4f6d8",
            ],
          },
          pubdate: "2021-06-24",
        },
      ];
      this.articles.push(...articles);
    },
  },
};
</script>

<style scoped lang="less">
.filter-card {
  margin-bottom: 30px;
}

.list-table {
  margin-bottom: 20px;
}
</style>