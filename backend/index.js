// import dotenv from "dotenv";
// dotenv.config();
// import express from "express";
// import bodyParser from "body-parser";
// import pg from "pg";
// import cors from "cors";
// import session from "express-session";
// import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
// import bcrypt from "bcrypt";
// import cookieParser from "cookie-parser";




// const app = express();
// app.use(cors({ origin: process.env.CORS_HOST,   credentials: true, }));
// app.use(bodyParser.json());
// app.use(express.json());
// app.use(cookieParser());


// app.use(
//   session({
//     secret: "mysecretkey",
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//       maxAge: 1000 * 60 * 60 * 24,
//       httpOnly: true,
//     },
//   })
// );
// app.use(passport.initialize());

// app.use(passport.session());

// const db = new pg.Client({
//   user: process.env.DB_USER,
//   host: process.env.DB_HOST,
//   database: process.env.DB_NAME,
//   password: process.env.DB_PASSWORD,
//   port: process.env.DB_PORT,
// });
// db.connect();
// const PORT = process.env.PORT;

// app.get("/", (req,res) =>{
//       res.send("Helo world")
// })

// app.post("/register", (req,res)=>{
//   const fullName =  req.body.fullName
//   const nationalNumber = req.body.nationalNumber
//   const languageLevel = req.body.level
//   const studyMode = req.body.mode
//   const location = req.body.location
//   const phone = req.body.phone
//   const course = req.body.course
//   const email = req.body.email
//   db.query("INSERT INTO students (name, national_id, level, mode, location, phone, course, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
//   [fullName, nationalNumber, languageLevel, studyMode, location, phone, course, email], (err,result)=>{
//     if(err){
//       console.error("Error inserting data:", err);
//       res.status(500).json({ error: "Internal server error" });
//     } else {
//       res.status(200).json({ message: "Registration successful" });
//     }
//   })

// })
// app.get("/students", (req,res)=>{
//   db.query("SELECT * FROM students", (err,result)=>{
//     if(err){
//       console.error("Error fetching data:", err);
//       res.status(500).json({ error: "Internal server error" });
//     } else {
//       res.status(200).json(result.rows);
//     }
//   })
// })





// app.listen(PORT, () => {
//   console.log(`Server running at http://localhost:${PORT}`);
// });











import dotenv from "dotenv";
dotenv.config();
import express from "express";
import bodyParser from "body-parser";
import pg from "pg";
import cors from "cors";
import session from "express-session";
import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import cookieParser from "cookie-parser";

const app = express();

app.use(cors({ origin: process.env.CORS_HOST, credentials: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cookieParser());
app.use(
  session({
    secret: process.env.SESSION_SECRET || "mysecretkey",
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24,
      httpOnly: true,
      path: "/", 
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

const db = new pg.Client({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});
db.connect();






// const username = "admin";
// const password = "admin123"; // change this
// const hashedPassword = await bcrypt.hash(password, 10);

// await db.query(
//   "INSERT INTO admins (email, password) VALUES ($1, $2)",
//   [username, hashedPassword]
// );

// console.log("Admin created successfully");
// await db.end();


// ─── Passport Local Strategy ───────────────────────────────────────────────

passport.use(
  new LocalStrategy({
    usernameField: "email",
    passwordField: "password",
  },async (email, password, done) => {
    try {
      const result = await db.query(
        "SELECT * FROM admins WHERE email = $1",
        [email]
      );

      if (result.rows.length === 0) {
        return done(null, false, { message: "Invalid email or password" });
      }

      const admin = result.rows[0];
      const isMatch = await bcrypt.compare(password, admin.password);

      if (!isMatch) {
        return done(null, false, { message: "Invalid email or password" });
      }

      return done(null, admin);
    } catch (err) {
      return done(err);
    }
  })
);

passport.serializeUser((admin, done) => {
  done(null, admin.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const result = await db.query("SELECT * FROM admins WHERE id = $1", [id]);
    done(null, result.rows[0]);
  } catch (err) {
    done(err);
  }
});

// ─── Auth Middleware ────────────────────────────────────────────────────────

function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) return next();
  res.status(401).json({ error: "Unauthorized. Please log in." });
}

// ─── Routes ────────────────────────────────────────────────────────────────

app.get("/", (req, res) => {
  res.send("Hello world");
});

// Login
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, admin, info) => {
    if (err) return next(err);
    if (!admin) return res.status(401).json({ error: info.message });

    req.logIn(admin, (err) => {
      if (err) return next(err);
      res.status(200).json({ message: "Login successful" });
    });
  })(req, res, next);
});

// Logout
// app.post("/logout", (req, res, next) => {
//   req.logout((err) => {
//     if (err) return next(err);
//     req.session.destroy(() => {
//       res.clearCookie("connect.sid");
//       res.status(200).json({ message: "Logged out successfully" });
//     });
//   });
// });


app.post("/logout", (req, res) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ error: "Logout failed" });
    }

    req.session.destroy(() => {
      res.clearCookie("connect.sid");

      return res.json({ message: "Logged out" });
    });
  });
});
// Check session status
app.get("/me", isAuthenticated, (req, res) => {
  res.status(200).json({ admin: req.user.email });
});

// Register student (protected)
app.post("/register", isAuthenticated, (req, res) => {
  const { fullName, nationalNumber, level, mode, location, phone, course, email } = req.body;

  db.query(
    "INSERT INTO students (name, national_id, level, mode, location, phone, course, email) VALUES ($1, $2, $3, $4, $5, $6, $7, $8)",
    [fullName, nationalNumber, level, mode, location, phone, course, email],
    (err) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).json({ error: "Internal server error" });
      }
      res.status(200).json({ message: "Registration successful" });
    }
  );
});

// Get all students (protected)
app.get("/students", isAuthenticated, (req, res) => {
  db.query("SELECT * FROM students", (err, result) => {
    if (err) {
      console.error("Error fetching data:", err);
      return res.status(500).json({ error: "Internal server error" });
    }
    res.status(200).json(result.rows);
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});