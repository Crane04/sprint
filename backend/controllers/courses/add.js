const Courses = require("../../models/Courses");
const AsyncHandler = require("express-async-handler");

const createCourse = AsyncHandler(async (req, res) => {
  const { code, title } = req.body;
  console.log(code,title)
  if(!code || !title){
    return res.json({
      "message": "Invalid code",
    })
  }

  const course = await Courses.create({
    code,
    title,
  });
  return res.json(course);
});

module.exports = createCourse;
