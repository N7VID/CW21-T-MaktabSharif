import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../redux/courseSlice";
import { useEffect } from "react";
import Card from "../components/card/Card";

export default function CoursePage() {
  const dispatch = useDispatch();
  const courses = useSelector((store) => store.course.course);

  useEffect(() => {
    dispatch(getCourse());
  }, []);

  console.log(courses);

  return (
    <div className="grid grid-cols-3 gap-4">
      {courses.map((course) => (
        <Card key={course.id} data={course} />
      ))}
    </div>
  );
}
