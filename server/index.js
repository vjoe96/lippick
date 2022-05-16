const express = require("express");
const app = express();
const port = 5000;
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const { auth } = require("./middleware/auth");
const { User } = require("./models/User");
const multer = require("multer");
const { Product } = require("./models/Product");
const { Payment } = require("./models/Payment");

// application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// application/json
app.use(bodyParser.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

const mongoose = require("mongoose");
const { off } = require("process");
mongoose
  .connect(
    "mongodb+srv://itwillteam3:teamteam333@boilerplate.ddtin.mongodb.net/myFirstDatabase?retryWrites=true&w=majority",
    {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    }
  )
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/api/users/register", (req, res) => {
  // 회원 가입 할 때 필요한 정보들을 client에서 가져오면
  // 그것들을 데이터 베이스에 넣어준다.

  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).json({
      success: true,
    });
  });
});

app.post("/api/users/login", (req, res) => {
  console.log("로그인 되고 있나?");
  // 요청된 이메일을 데이터베이스에서 있는지 찾는다.
  User.findOne({ email: req.body.email }, (err, user) => {
    if (!user) {
      return res.json({
        loginSuccess: false,
        message: "해당하는 유저가 없습니다.",
      });
    }

    // 요청된 이메일이 데이터베이스에 있다면 비밀번호가 맞는 비밀번호인지 확인
    user.comparePassword(req.body.password, (err, isMatch) => {
      if (!isMatch)
        return res.json({
          loginSuccess: false,
          message: "비밀번호가 틀렸습니다.",
        });

      // 비밀번호까지 맞다면 토큰을 생성하기.
      user.generateToken((err, user) => {
        if (err) return res.status(400).send(err);
        console.log("아디비번 맞음");
        // 토근을 저장한다.
        res
          .cookie("x_auth", user.token)
          .status(200)
          .json({ loginSuccess: true, userId: user._id });
      });
    });
  });
});

app.get("/api/users/auth", auth, (req, res) => {
  // 여기까지 middleware를 통과해 왔다는 얘기는 Auth가 true라는 말.
  res.status(200).json({
    _id: req.user._id,
    isAdmin: req.user.role == 0 ? false : true,
    isAuth: true,
    email: req.user.email,
    name: req.user.name,
    role: req.user.role,
    cart: req.user.cart,
    wish: req.user.wish,
    history: req.user.history,
  });
});

app.get("/api/users/logout", auth, (req, res) => {
  User.findOneAndUpdate({ _id: req.user._id }, { token: "" }, (err, user) => {
    if (err) return res.json({ success: false, err });
    return res.status(200).send({
      success: true,
    });
  });
});

app.post("/api/product/image", (req, res) => {
  const path = require("path");
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, `${Date.now()}_${file.originalname}`);
    },
  });

  const upload = multer({ storage: storage }).single("file");

  // 가져오 이미지를 저장.
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    }
    console.log("이미지를 가져오나");
    return res.json({
      success: true,
      filePath: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
});

app.post("/api/product", (req, res) => {
  // 받아온 정보들을 디비에 넣어준다.
  const product = new Product(req.body);
  product.save((err) => {
    if (err) return res.status(400).json({ success: false, err });
    return res.status(200).json({ success: true });
  });
});

app.post("/api/product/products", (req, res) => {
  // product collection에 들어있는 모든 상품 정보를 불러오기

  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  Product.find()
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({
        success: true,
        productInfo,
        postSize: productInfo.length,
      });
    });
});

app.post("/api/product/lipstick", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  Product.find()
    .find({ category: "립스틱" })
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({
        success: true,
        productInfo,
        postSize: productInfo.length,
      });
    });
});

app.post("/api/product/liquid", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  Product.find()
    .find({ category: "리퀴드" })
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({
        success: true,
        productInfo,
        postSize: productInfo.length,
      });
    });
});

app.post("/api/product/gloss", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  Product.find()
    .find({ category: "립글로스" })
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({
        success: true,
        productInfo,
        postSize: productInfo.length,
      });
    });
});

app.post("/api/product/care", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;

  Product.find()
    .find({ category: "립케어" })
    .skip(skip)
    .limit(limit)
    .exec((err, productInfo) => {
      if (err) return res.status(400).json({ success: false, err });
      return res.status(200).json({
        success: true,
        productInfo,
        postSize: productInfo.length,
      });
    });
});

app.post("/api/search", (req, res) => {
  let limit = req.body.limit ? parseInt(req.body.limit) : 20;
  let skip = req.body.skip ? parseInt(req.body.skip) : 0;
  let term = req.body.searchTerm;

  let findArgs = {};

  for (let key in req.body.filters) {
    if (req.body.filters[key].length > 0) {
      console.log("key", key);

      if (key === "price") {
        findArgs[key] = {
          $gte: req.body.filters[key][0],

          $lte: req.body.filters[key][1],
        };
      } else {
        findArgs[key] = req.body.filters[key];
      }
    }
  }
  console.log(term);

  if (term) {
    Product.find(findArgs)
      .find({ $text: { $search: term } })
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo,
          postSize: productInfo.length,
        });
      });

    console.log(1);
  } else {
    Product.find(findArgs)
      .populate("writer")
      .skip(skip)
      .limit(limit)
      .exec((err, productInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        return res.status(200).json({
          success: true,
          productInfo,
          postSize: productInfo.length,
        });
      });
  }
});

app.get("/api/product/products_by_id", (req, res) => {
  let type = req.query.type;
  let productIds = req.query.id;

  if (type === "array") {
    let ids = req.query.id.split(",");
    productIds = ids.map((item) => {
      return item;
    });
  }

  // productId를 이용해서 DB에서 productId와 같은 상품의 정보를 가져온다.

  Product.find({ _id: { $in: productIds } }).exec((err, product) => {
    console.log(product);
    if (err) return res.status(400).send(err);
    return res.status(200).json(product);
  });
});

app.post("/api/users/addToCart", auth, (req, res) => {
  // 먼저 User Collection에 해당 유저의 정보를 가져오기
  // let userid = props.sessionStorage.getItem("userId")
  // console.log("session userid", userid)
  console.log("유저아이디", req.user._id);
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    // 가져온 정보에서 카트에다 넣으려 하는 상품이 이미 들어 있는 지 확인
    let duplicate = false;
    userInfo.cart.forEach((item) => {
      if (item.id === req.body.productId) {
        duplicate = true;
      }
    });
    // 상품이 이미 있을 때
    if (duplicate) {
      User.findOneAndUpdate(
        { _id: req.user._id, "cart.id": req.body.productId },
        { $inc: { "cart.$.quantity": 1 } },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
    } // 상품이 없을 때
    else {
      User.findOneAndUpdate(
        { _id: req.user._id },
        {
          $push: {
            cart: {
              id: req.body.productId,
              quantity: 1,
              date: Date.now(),
            },
          },
        },
        { new: true },
        (err, userInfo) => {
          if (err) return res.status(400).json({ success: false, err });
          res.status(200).send(userInfo.cart);
        }
      );
    }
  });
});

app.get("/api/users/removeFromCart", auth, (req, res) => {
  // 먼저 cart안에 내가 지우려고 한 제품을 지워주기
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: { cart: { id: req.query.id } },
    },
    { new: true },
    (err, userInfo) => {
      let cart = userInfo.cart;
      let array = cart.map((item) => {
        return item.id;
      });

      Product.find({ _id: { $in: array } }).exec((err, productInfo) => {
        return res.status(200).json({
          productInfo,
          cart,
        });
      });
    }
  );
});

app.post("/api/users/successBuy", auth, (req, res) => {
  // 1. User Collection 안에 History 필드 안에 간단한 결제 정보 넣어주기
  let history = [];
  let transactionData = {};

  req.body.cartDetail.forEach((item) => {
    history.push({
      dataOfPurchase: Date.now(),
      name: item.title,
      id: item._id,
      price: item.price,
      quantity: item.quantity,
      paymentId: req.body.paymentData.paymentID,
      image:item.images[0],
      color:item.color
    });
  });

  // 2. Payment Collection 안에 자세한 결제 정보를 넣어주기.
  transactionData.user = {
    id: req.user._id,
    name: req.user.name,
    email: req.user.email,
  };

  transactionData.data = req.body.paymentData;
  transactionData.product = history;

  // history 정보 저장
  User.findOneAndUpdate(
    { _id: req.user._id },
    { $push: { history: history }, $set: { cart: [] } },
    { new: true },
    (err, user) => {
      if (err) return res.json({ success: false, err });

      // payment에다가 transactionData 정보 저장
      const payment = new Payment(transactionData);
      payment.save((err, doc) => {
        if (err) return res.json({ success: false, err });
        res.status(200).json({
          success: true,
          cart: user.cart,
          cartDetail: [],
        });

        // 상품 당 몇개의 quantity를 샀는지

        let products = [];
        doc.product.forEach((item) => {
          products.push({ id: item.id, quantity: item.quantity });
        });
      });
    }
  );
});

app.post("/api/users/addToWish", auth, (req, res) => {
  // 먼저 User Collection에 해당 유저의 정보를 가져오기
  // let userid = props.sessionStorage.getItem("userId")
  // console.log("session userid", userid)
  User.findOne({ _id: req.user._id }, (err, userInfo) => {
    User.findOneAndUpdate(
      { _id: req.user._id },
      {
        $push: {
          wish: {
            id: req.body.productId,
          },
        },
      },
      { new: true },
      (err, userInfo) => {
        if (err) return res.status(400).json({ success: false, err });
        res.status(200).send(userInfo.wish);
      }
    );
  });
});

app.get("/api/users/removeFromWish", auth, (req, res) => {
  // 먼저 cart안에 내가 지우려고 한 제품을 지워주기
  User.findOneAndUpdate(
    { _id: req.user._id },
    {
      $pull: { wish: { id: req.query.id } },
    },
    { new: true },
    (err, userInfo) => {
      let wish = userInfo.wish;
      let array = wish.map((item) => {
        return item.id;
      });

      Product.find({ _id: { $in: array } }).exec((err, productInfo) => {
        return res.status(200).json({
          productInfo,
          wish,
        });
      });
    }
  );
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
