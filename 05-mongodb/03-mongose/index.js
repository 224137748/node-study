const mongoose = require("mongoose");

// 1、连接
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
});

const conn = mongoose.connection;

conn.on("error", (err) => {
  console.log("数据库连接错误", err);
});

conn.once("open", async () => {
  // 2、定义一个Sechema
  const Schema = mongoose.Schema({
    cagegory: String,
    name: String,
  });

  // 3、编译一个model它对应数据库中复数，小写的collection
  const Model = mongoose.model("fruit", Schema);

  try {
    // 4、创建
    // let r = await Model.create({
    //   cagegory: "温带水果",
    //   name: "苹果",
    //   price: 5,
    // });
    // console.log("插入数据", r);

    // 5、查询，find返回Query，它实现了then和catch，可以当promise使用
    // 如果需要返回promise ，调用exec()
    // r = await Model.find({ name: '苹果' });
    // console.log('查询结果：', r);

    // 6、更新水果
    // r = await Model.updateOne({ name: '苹果' }, {
    //   $set: {
    //     name: '芒果'
    //   }
    // });
    // console.log('更新结果', r);

    // 7、删除，deletOne 返回query
    // r = await Model.deleteOne({ name: '苹果' });
    // console.log('删除', r);

    const blogSchema = mongoose.Schema({
      title: {
        type: String,
        require: [true, "标题为必填项"],
      },
      author: String,
      body: String,
      comments: [{ body: String, date: Date }],
      date: {
        type: Date,
        default: Date.now,
      },
      hidden: Boolean,
      meta: {
        votes: Number,
        favs: Number,
      },
    });

    // 定义多个索引
    blogSchema.index({ title: 1, author: 1, date: -1 });
    const BlogModel = mongoose.model("blog", blogSchema);
    const blog = new BlogModel({
      title: "nodejs 持久化",
      author: "jerry",
      body: ".....",
    });

    const r = await blog.save();
    console.log("新增blog", r);

    // 定义多个索引
  } catch (error) {
    console.log(error);
  }
});
