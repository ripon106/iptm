const express = require("express");
const cors = require("cors");
require("dotenv").config();
const bodyParser = require("body-parser");

const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.1rrkbzk.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
});

let isConnected = false;

async function connectToDatabase() {
  if (!isConnected) {
    try {
      await client.connect();
      isConnected = true;
      console.log("Connected to MongoDB!");
    } catch (error) {
      console.error("MongoDB connection error:", error);
      throw error;
    }
  }
}

// Initialize database connection and routes
async function initializeApp() {
  await connectToDatabase();

  const rplCollection = client.db("IPTMIT_INFO").collection("RPL_INFO");

  // RPL Operation
  app.get("/rpl-assesment", async (req, res) => {
    try {
      const cursor = rplCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.post("/rpl-assesment", async (req, res) => {
    try {
      const rpl = req.body;
      const result = await rplCollection.insertOne(rpl);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.get("/rpl-assesment/:id", async (req, res) => {
    try {
      const id = await req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await rplCollection.findOne(query);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.delete("/rpl-assesment/:id", async (req, res) => {
    try {
      const id = await req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await rplCollection.deleteOne(query);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.put("/rpl-assesment/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const filter = { _id: new ObjectId(id) };
      const options = { upsert: true };
      const updatedData = req.body;

      const updateDoc = {
        $set: {
          rplTitle: updatedData.rplTitle,
          rplFee: updatedData.rplFee,
          rplImgURL: updatedData.rplImgURL,
        },
      };
      const result = await rplCollection.updateOne(filter, updateDoc, options);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  // NSDA
  const nsdaCollection = client.db("IPTMIT_INFO").collection("NSDA_INFO");
  app.get("/nsda-certification", async (req, res) => {
    try {
      const cursor = nsdaCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.post("/nsda-certification", async (req, res) => {
    try {
      const nsda = req.body;
      const result = await nsdaCollection.insertOne(nsda);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.delete("/nsda-certification/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await nsdaCollection.deleteOne(query);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.get("/nsda-certification/:id", async (req, res) => {
    try {
      const id = await req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await nsdaCollection.findOne(query);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.put("/nsda-certification/:id", async (req, res) => {
    try {
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

      const result = await nsdaCollection.updateOne(
        filter,
        updateNsdaDoc,
        options
      );
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  // Student success
  const successCollection = client.db("IPTMIT_INFO").collection("SUCCESS_INFO");
  app.post("/our-success", async (req, res) => {
    try {
      const success = req.body;
      const result = await successCollection.insertOne(success);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.get("/our-success", async (req, res) => {
    try {
      const cursor = successCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.delete("/our-success/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await successCollection.deleteOne(query);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  // Professional courses
  const proCoursesCollection = client
    .db("IPTMIT_INFO")
    .collection("PROFESSIONAL_INFO");
  app.get("/professional-course", async (req, res) => {
    try {
      const cursor = proCoursesCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.post("/professional-course", async (req, res) => {
    try {
      const newSub = await req.body;
      const result = await proCoursesCollection.insertOne(newSub);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.get("/professional-course/:id", async (req, res) => {
    try {
      const id = await req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await proCoursesCollection.findOne(query);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.delete("/professional-course/:id", async (req, res) => {
    try {
      const id = await req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await proCoursesCollection.deleteOne(query);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.put("/professional-course/:id", async (req, res) => {
    try {
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
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  // About Information
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
    try {
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
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  // Gallery operation
  const galleryCollection = client.db("IPTMIT_INFO").collection("GALLERY_INFO");

  app.post("/gallery", async (req, res) => {
    try {
      const picture = await req.body;
      const result = await galleryCollection.insertOne(picture);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.get("/gallery", async (req, res) => {
    try {
      const cursor = galleryCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.delete("/gallery/:id", async (req, res) => {
    try {
      const id = req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await galleryCollection.deleteOne(query);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  // Management information
  const managementCollection = client
    .db("IPTMIT_INFO")
    .collection("MANAGEMENT_INFO");
  app.post("/management-info", async (req, res) => {
    try {
      const managementInfo = req.body;
      const result = await managementCollection.insertOne(managementInfo);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.get("/management-info", async (req, res) => {
    try {
      const cursor = managementCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.get("/management-info/:id", async (req, res) => {
    try {
      const id = await req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await managementCollection.findOne(query);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.delete("/management-info/:id", async (req, res) => {
    try {
      const id = await req.params.id;
      const query = { _id: new ObjectId(id) };
      const result = await managementCollection.deleteOne(query);
      res.send(result);
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  app.put("/management-info/:id", async (req, res) => {
    try {
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
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  // Admin information
  const adminInfoCollection = client.db("IPTMIT_INFO").collection("ADMIN_INFO");
  app.get("/admin-info/:id", async (req, res) => {
    const id = req.params.id;
    try {
      const result = await adminInfoCollection.findOne({
        _id: new ObjectId(id),
      });
      res.send(result);
    } catch (err) {
      res.status(500).send({ error: "Invalid ID or server error" });
    }
  });

  app.put("/admin-info/:id", async (req, res) => {
    try {
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
    } catch (error) {
      res.status(500).send({ error: error.message });
    }
  });

  // Test route
  app.get("/test", (req, res) => {
    res.send("Welcome to server");
  });

  // Default route
  app.get("/", (req, res) => {
    res.send("Express on Vercel - IPTM IT Backend");
  });
}

// Initialize the app
initializeApp().catch(console.error);

// Export the Express app for Vercel
module.exports = app;
