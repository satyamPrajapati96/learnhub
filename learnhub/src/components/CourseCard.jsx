import { Link } from "react-router-dom";
import { Clock3, BookOpen, Star, ArrowUpRight } from "lucide-react";

export default function CourseCard({ course }) {
  return (
    <article className="course-card">
      <Link
        to={`/courses/${course.id}`}
        className="course-art"
        style={{ background: course.color }}
      >
        <span className="course-emoji">{course.icon}</span>
        <span className="course-category">{course.category}</span>
        <span className="art-arrow"><ArrowUpRight size={19} /></span>
      </Link>

      <div className="course-content">
        <div className="course-meta">
          <span className="rating">
            <Star size={14} fill="#f4b942" color="#f4b942" />
            {course.rating}
          </span>
          <span>{course.level}</span>
        </div>

        <Link to={`/courses/${course.id}`} className="course-title">
          {course.title}
        </Link>

        <p className="course-instructor">By {course.instructor}</p>

        <div className="course-footer">
          <span><Clock3 size={15} /> {course.duration}</span>
          <span><BookOpen size={15} /> {course.lessons} lessons</span>
        </div>

        <div className="course-bottom">
          <strong>Free</strong>
          <Link to={`/courses/${course.id}`} className="view-link">
            View course <ArrowUpRight size={15} />
          </Link>
        </div>
      </div>
    </article>
  );
}