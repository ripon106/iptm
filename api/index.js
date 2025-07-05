import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import bodyParser from "body-parser";
import { MongoClient, ServerApiVersion, ObjectId } from "mongodb";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1rrkbzk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

await client.connect();

const rplCollection = client.db("IPTMIT_INFO").collection("RPL_INFO");

// RPL Opearation
app.get("/rpl-assesment", async (req, res) => {
  const cursor = rplCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});

app.post("/rpl-assesment", async (req, res) => {
  const rpl = req.body;
  const result = await rplCollection.insertOne(rpl);
  res.send(result);
});
app.get("/rpl-assesment/:id", async (req, res) => {
  const id = await req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await rplCollection.findOne(query);
  res.send(result);
});

app.delete("/rpl-assesment/:id", async (req, res) => {
  const id = await req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await rplCollection.deleteOne(query);
  res.send(result);
});

app.put("/rpl-assesment/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const options = { upsert: true };
  const updatedData = req.body;
  console.log(updatedData)
  const updateDoc = {
    $set: {
      rplTitle: updatedData.rplTitle,
      rplFee: updatedData.rplFee,
      rplImgURL: updatedData.rplImgURL,
    },
  };
  const result = await rplCollection.updateOne(filter, updateDoc, options);
  res.send(result);
});

// NSDA
const nsdaCollection = client.db("IPTMIT_INFO").collection("NSDA_INFO");
app.get("/nsda-certification", async (req, res) => {
  const cursor = nsdaCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});
app.post("/nsda-certification", async (req, res) => {
  const nsda = req.body;
  const result = await nsdaCollection.insertOne(nsda);
  res.send(result);
});
app.delete("/nsda-certification/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await nsdaCollection.deleteOne(query);
  res.send(result);
});
app.get("/nsda-certification/:id", async (req, res) => {
  const id = await req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await nsdaCollection.findOne(query);
  res.send(result);
});
app.put("/nsda-certification/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const nsdaDoc = req.body;
  const options = { upsert: true };
  const updateNsdaDoc = {
    $set: {
      nsdaTitle: nsdaDoc.nsdaTitle,
      nsdaDuration: nsdaDoc.nsdaOverview,
      nsdaImgURL: nsdaDoc.nsdaImgURL,
      nsdaOverview: nsdaDoc.nsdaOverview,
    },
  };

  const result = await nsdaCollection.updateOne(filter, updateNsdaDoc, options);
  res.send(result);
});

//   Sutudent success
const successCollection = client.db("IPTMIT_INFO").collection("SUCCESS_INFO");
app.post("/our-success", async (req, res) => {
  const success = req.body;
  const result = await successCollection.insertOne(success);
  res.send(result);
});

app.get("/our-success", async (req, res) => {
  const cursor = successCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});

app.delete("/our-success/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await successCollection.deleteOne(query);
  res.send(result);
});

//   Achievement success
const achivementCollection = client.db("IPTMIT_INFO").collection("ACHIEVEMENT_INFO");
app.post("/achivement", async (req, res) => {
  const success = req.body;
  const result = await achivementCollection.insertOne(success);
  res.send(result);
  console.log(result)
});

app.get("/achivement", async (req, res) => {
  const cursor = achivementCollection.find();
  const result = await cursor.toArray();
  res.send(result);
});

app.delete("/achivement/:id", async (req, res) => {
  const id = req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await achivementCollection.deleteOne(query);
  res.send(result);
});

app.get("/achivement/:id", async (req, res) => {
  const id = await req.params.id;
  const query = { _id: new ObjectId(id) };
  const result = await achivementCollection.findOne(query);
  res.send(result);
});
app.put("/achivement/:id", async (req, res) => {
  const id = req.params.id;
  const filter = { _id: new ObjectId(id) };
  const achievementDoc = req.body;
  const options = { upsert: true };
  const updateAchievementDoc = {
    $set: {
      title: achievementDoc.title,
      content: achievementDoc.content,
      imgURL: achievementDoc.imgURL,
     
    },
  };

  const result = await achivementCollection.updateOne(filter, updateAchievementDoc, options);
  res.send(result);
});
  // Professional courses
  const proCoursesCollection = client
    .db("IPTMIT_INFO")
    .collection("PROFESSIONAL_INFO");
  app.get("/professional-course", async (req, res) => {
    const cursor = proCoursesCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  });

  app.post("/professional-course", async (req, res) => {
    const newSub = await req.body;
    const result = await proCoursesCollection.insertOne(newSub);
    res.send(result);
  });

  app.get("/professional-course/:id", async (req, res) => {
    const id = await req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await proCoursesCollection.findOne(query);
    res.send(result);
  });

  app.get("/professional-course/:id", async (req, res) => {
    const id = await req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await proCoursesCollection.findOne(query);
    res.send(result);
  });
  app.delete("/professional-course/:id", async (req, res) => {
    const id = await req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await proCoursesCollection.deleteOne(query);
    res.send(result);
  });

  app.put("/professional-course/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updatedData = req.body;
    const updateDoc = {
      $set: {
        title: updatedData.title,
        category: updatedData.category,
        shortDescription: updatedData.shortDescription,
        duration: updatedData.duration,
        lectures: updatedData.lectures,
        projects: updatedData.projects,
        regularFeeOnline: updatedData.regularFeeOnline,
        discountFeeOnline: updatedData.discountFeeOnline,
        regularFeeOffline: updatedData.regularFeeOffline,
        discountFeeOffline: updatedData.discountFeeOffline,
        imgURL: updatedData.imgURL,
        overview: updatedData.overview,
        curriculum: updatedData.curriculum,
        tools: updatedData.tools,
        opportunities: updatedData.opportunities,
      },
    };
    const result = await proCoursesCollection.updateOne(
      filter,
      updateDoc,
      options
    );
    res.send(result);
  });

  // About Infortamitoon
  const aboutCollection = client.db("IPTMIT_INFO").collection("ABOUT_INFO");

  app.get("/about-info/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const result = await aboutCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    } catch (err) {
      res.status(500).send({ error: "Invalid ID or server error" });
    }
  });

  app.put("/about-info/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const aboutDoc = req.body;
    const options = { upsert: true };
    const updateAboutDoc = {
      $set: {
        students: aboutDoc.students,
        reviews: aboutDoc.reviews,
        newStudents: aboutDoc.newStudents,
        letestEvent: aboutDoc.letestEvent,
        overview: aboutDoc.overview,
        mission: aboutDoc.mission,
        vission: aboutDoc.vission,
      },
    };
    const result = await aboutCollection.updateOne(
      filter,
      updateAboutDoc,
      options
    );
    res.send(result);
  });

  // gallery operation
  const galleryCollection = client.db("IPTMIT_INFO").collection("GALLERY_INFO");

  app.post("/gallery", async (req, res) => {
    const picture = await req.body;
    const result = await galleryCollection.insertOne(picture);
    res.send(result);
  });
  app.get("/gallery", async (req, res) => {
    const cursor = galleryCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  });

  app.delete("/gallery/:id", async (req, res) => {
    const id = req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await galleryCollection.deleteOne(query);
    res.send(result);
  });

  // Management information
  const managementCollection = client
    .db("IPTMIT_INFO")
    .collection("MANAGEMENT_INFO");
  app.post("/management-info", async (req, res) => {
    const managementInfo = req.body;
    const result = await managementCollection.insertOne(managementInfo);
    res.send(result);
  });

  app.get("/management-info", async (req, res) => {
    const cursor = managementCollection.find();
    const result = await cursor.toArray();
    res.send(result);
  });

  app.get("/management-info/:id", async (req, res) => {
    const id = await req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await managementCollection.findOne(query);
    res.send(result);
  });

  app.delete("/management-info/:id", async (req, res) => {
    const id = await req.params.id;
    const query = { _id: new ObjectId(id) };
    const result = await managementCollection.deleteOne(query);
    res.send(result);
  });

  app.put("/management-info/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const options = { upsert: true };
    const updatedData = req.body;
    const updateDoc = {
      $set: {
        name: updatedData.name,
        position: updatedData.position,
        about: updatedData.about,
        imgURL: updatedData.imgURL,
      },
    };
    const result = await managementCollection.updateOne(
      filter,
      updateDoc,
      options
    );
    res.send(result);
  });

  // Admin information
  const adminInfoCollection = client.db("IPTMIT_INFO").collection("ADMIN_INFO");
  app.get("/admin-info/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const result = await adminInfoCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    } catch (err) {
      res.status(500).send({ error: "Invalid ID or server error" });
    }
  });

  app.put("/admin-info/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const adminDoc = req.body;
    const options = { upsert: true };
    const updateAdminDoc = {
      $set: {
        userName: adminDoc.userName,
        userEmail: adminDoc.userEmail,
        password: adminDoc.password,
      },
    };
    const result = await adminInfoCollection.updateOne(
      filter,
      updateAdminDoc,
      options
    );
    res.send(result);
  });

  // logo info

  const logoCollection = client.db("IPTMIT_INFO").collection("LOGO_INFO");
  app.get("/logo-info/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const result = await logoCollection.findOne({ _id: new ObjectId(id) });
      res.send(result);
    } catch (err) {
      res.status(500).send({ error: "Invalid ID or server error" });
    }
  });

  app.put("/logo-info/:id", async (req, res) => {
    const id = req.params.id;
    const filter = { _id: new ObjectId(id) };
    const logoDoc = req.body;
    const options = { upsert: true };
    const updateLogo = {
      $set: {
        imgUrl: logoDoc.imgURL,

      },
    };
    const result = await logoCollection.updateOne(
      filter,
      updateLogo,
      options
    );
    console.log("data")
    res.send(result);
  });


  console.log("Pinged your deployment. You successfully connected to MongoDB!");

  app.get("/", cors(), (req, res) => {
    res.send("Welcome to server");
  });

  app.listen(port, function () {
    console.log(`CORS-enabled web server listening on port ${port}`);
  });
