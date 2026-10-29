
import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useParams,
  useNavigate,
  useSearchParams,
} from "react-router-dom";
import {
  BookOpen,
  Search,
  ArrowRight,
  Clock3,
  Star,
  GraduationCap,
  Target,
  Users,
  Sparkles,
  CheckCircle2,
  X,
} from "lucide-react";
import { courses } from "./data/courses";
import Navbar from "./components/Navbar";
import CourseCard from "./components/CourseCard";

function getEnrolled() {
  try {
    return JSON.parse(localStorage.getItem("learnhub-enrolled")) || [];
  } catch {
    return [];
  }
}

function Home() {
  const [search, setSearch] = useState("");

  function handleSearch(e) {
    e.preventDefault();
    window.location.href = `/courses?search=${encodeURIComponent(search)}`;
  }

  return (
    <>
      <section className="hero">
        <div className="hero-copy">
          <div className="eyebrow">
            <Sparkles size={15} /> YOUR NEXT CHAPTER STARTS HERE
          </div>
          <h1>Learn new skills.<br />Build your <span>future.</span></h1>
          <p className="hero-description">
            Discover courses, learn at your own pace, and turn your
            curiosity into skills that matter.
          </p>
          <form className="hero-search" onSubmit={handleSearch}>
            <Search size={19} />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="What do you want to learn?"
              aria-label="Search courses"
            />
            <button type="submit">Explore <ArrowRight size={16} /></button>
          </form>
          <div className="hero-proof">
            <span className="proof-emoji">👩🏻 👨🏽 👩🏾</span>
            <p><strong>Learn something new</strong><br />Every day, at your own pace.</p>
          </div>
        </div>

        <div className="hero-visual">
          <div className="hero-orbit orbit-one" />
          <div className="hero-orbit orbit-two" />
          <div className="hero-main-card">
            <span className="card-label"><span className="live-dot" /> YOUR LEARNING SPACE</span>
            <div className="hero-illustration">📚</div>
            <h3>Small steps.<br />Big possibilities.</h3>
            <p>Your next skill is closer than you think.</p>
            <div className="mini-progress">
              <div><span>Learning journey</span><strong>75%</strong></div>
              <div className="progress-track"><span /></div>
            </div>
          </div>
          <div className="float-card float-top">
            <span>🎯</span>
            <div><strong>Keep growing</strong><small>One lesson at a time</small></div>
          </div>
          <div className="float-card float-bottom">
            <span>✨</span>
            <div><strong>Discover your potential</strong><small>Learn something new</small></div>
          </div>
        </div>
      </section>

      <section className="stats-strip">
        <div><Users /><strong>Explore</strong><span>New learning paths</span></div>
        <div><BookOpen /><strong>6 Courses</strong><span>Multiple topics</span></div>
        <div><GraduationCap /><strong>Self-paced</strong><span>Learn on your schedule</span></div>
        <div><Target /><strong>Keep growing</strong><span>One lesson at a time</span></div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="section-kicker">PICK UP A NEW SKILL</span>
            <h2>Explore popular courses</h2>
            <p>Find a topic that inspires you to learn more.</p>
          </div>
          <Link to="/courses" className="text-link">View all courses <ArrowRight size={17} /></Link>
        </div>
        <div className="course-grid">
          {courses.slice(0, 3).map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </section>

      <section className="learning-banner">
        <div>
          <span className="section-kicker">YOUR JOURNEY, YOUR PACE</span>
          <h2>Make learning a habit,<br />not a someday plan.</h2>
          <p>Choose a course and take your next step.</p>
          <Link to="/courses" className="primary-button">Find your course <ArrowRight size={17} /></Link>
        </div>
        <div className="banner-art">🚀</div>
      </section>
    </>
  );
}

function CoursesPage() {
  const [params, setParams] = useSearchParams();
  const [search, setSearch] = useState(params.get("search") || "");
  const [category, setCategory] = useState("All");
  const [level, setLevel] = useState("All");

  const categories = ["All", ...new Set(courses.map((c) => c.category))];

  const filtered = courses.filter((course) => {
    const term = search.toLowerCase();
    return (
      (course.title.toLowerCase().includes(term) ||
        course.description.toLowerCase().includes(term)) &&
      (category === "All" || course.category === category) &&
      (level === "All" || course.level === level)
    );
  });

  function updateSearch(value) {
    setSearch(value);
    setParams(value ? { search: value } : {});
  }

  function clearFilters() {
    setSearch("");
    setCategory("All");
    setLevel("All");
    setParams({});
  }

  return (
    <section className="page-section">
      <div className="page-heading">
        <span className="section-kicker">THE LEARNING LIBRARY</span>
        <h1>Explore courses<span>.</span></h1>
        <p>Find something you love learning about.</p>
      </div>

      <div className="filter-panel">
        <div className="catalog-search">
          <Search size={19} />
          <input
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
            placeholder="Search courses..."
            aria-label="Search courses"
          />
        </div>
        <select value={level} onChange={(e) => setLevel(e.target.value)}>
          <option value="All">All levels</option>
          <option value="Beginner">Beginner</option>
          <option value="Intermediate">Intermediate</option>
        </select>
      </div>

      <div className="category-pills">
        {categories.map((item) => (
          <button
            key={item}
            className={category === item ? "category-pill active" : "category-pill"}
            onClick={() => setCategory(item)}
          >
            {item}
          </button>
        ))}
      </div>

      <p className="results-count">
        {filtered.length} {filtered.length === 1 ? "course" : "courses"} found
      </p>

      {filtered.length ? (
        <div className="course-grid">
          {filtered.map((course) => <CourseCard key={course.id} course={course} />)}
        </div>
      ) : (
        <div className="empty-state">
          <Search size={36} />
          <h3>No courses found</h3>
          <p>Try another search or change the filters.</p>
          <button className="secondary-button" onClick={clearFilters}>Clear filters</button>
        </div>
      )}
    </section>
  );
}

function CourseDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const course = courses.find((item) => item.id === id);
  const [enrolled, setEnrolled] = useState(() => getEnrolled().includes(id));

  if (!course) {
    return (
      <div className="empty-state page-section">
        <h2>Course not found</h2>
        <Link to="/courses" className="primary-button">Browse courses</Link>
      </div>
    );
  }

  function enroll() {
    const current = getEnrolled();
    if (!current.includes(id)) {
      localStorage.setItem("learnhub-enrolled", JSON.stringify([...current, id]));
    }
    setEnrolled(true);
  }

  return (
    <section className="detail-layout page-section">
      <div className="detail-main">
        <Link to="/courses" className="back-link">← All courses</Link>
        <div className="detail-art" style={{ background: course.color }}>
          <span>{course.icon}</span>
        </div>
        <span className="section-kicker">{course.category.toUpperCase()}</span>
        <h1>{course.title}</h1>
        <p className="detail-description">{course.description}</p>
        <div className="detail-facts">
          <span><Star size={15} /> {course.rating} rating</span>
          <span><Clock3 size={15} /> {course.duration}</span>
          <span><BookOpen size={15} /> {course.lessons} lessons</span>
          <span>{course.level}</span>
        </div>

        <div className="detail-info">
          <h2>What you'll learn</h2>
          {[
            "Understand the core concepts step by step",
            "Build practical skills with guided lessons",
            "Apply your knowledge to real-world problems",
            "Learn at your own pace",
          ].map((item) => <p key={item}><CheckCircle2 size={18} /> {item}</p>)}
        </div>

        <div className="detail-info">
          <h2>Course curriculum</h2>
          {[
            "Getting started and foundations",
            "Understanding the key concepts",
            "Hands-on practice and exercises",
            "Review and next steps",
          ].map((lesson, index) => (
            <div className="curriculum-row" key={lesson}>
              <span className="lesson-number">{String(index + 1).padStart(2, "0")}</span>
              <span>{lesson}</span>
              <CheckCircle2 size={16} />
            </div>
          ))}
          <p className="muted-note">Sample curriculum for this demo.</p>
        </div>
      </div>

      <aside className="enroll-card">
        <div className="enroll-art" style={{ background: course.color }}>{course.icon}</div>
        <span className="free-label">FREE COURSE</span>
        <h2>Start learning today</h2>
        <p>Enroll and keep track of your courses in the dashboard.</p>
        <button
          className="primary-button full-button"
          onClick={() => enrolled ? navigate("/dashboard") : enroll()}
        >
          {enrolled ? "Go to dashboard" : "Enroll for free"} <ArrowRight size={17} />
        </button>
        {enrolled && <p className="success-note"><CheckCircle2 size={16} /> You're enrolled!</p>}
        {["Self-paced learning", "Progress tracking", "Free access"].map((item) => (
          <div className="enroll-benefit" key={item}><CheckCircle2 size={16} /> {item}</div>
        ))}
      </aside>
    </section>
  );
}

function Dashboard() {
  const [enrolledIds, setEnrolledIds] = useState(getEnrolled);
  const enrolledCourses = courses.filter((course) => enrolledIds.includes(course.id));

  function removeCourse(id) {
    const updated = enrolledIds.filter((item) => item !== id);
    localStorage.setItem("learnhub-enrolled", JSON.stringify(updated));
    setEnrolledIds(updated);
  }

  return (
    <section className="page-section dashboard-page">
      <span className="section-kicker">YOUR PERSONAL SPACE</span>
      <h1>My learning dashboard<span>.</span></h1>
      <p className="page-intro">Every expert was once a beginner. Keep going!</p>

      <div className="dashboard-stats">
        <div><BookOpen /><span>Enrolled courses</span><strong>{enrolledCourses.length}</strong></div>
        <div><GraduationCap /><span>Available lessons</span><strong>{enrolledCourses.reduce((sum, c) => sum + c.lessons, 0)}</strong></div>
        <div><Target /><span>Learning status</span><strong>{enrolledCourses.length ? "In progress" : "Ready to start"}</strong></div>
      </div>

      <div className="section-heading dashboard-heading">
        <div><h2>My courses</h2><p>Your enrolled courses appear here.</p></div>
        <Link to="/courses" className="text-link">Explore courses <ArrowRight size={16} /></Link>
      </div>

      {enrolledCourses.length ? (
        <div className="course-grid">
          {enrolledCourses.map((course) => (
            <div key={course.id}>
              <CourseCard course={course} />
              <button className="remove-course" onClick={() => removeCourse(course.id)}>
                <X size={15} /> Remove course
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-state">
          <GraduationCap size={36} />
          <h3>Your learning journey starts here</h3>
          <p>Explore the library and choose your first course.</p>
          <Link to="/courses" className="primary-button">Explore courses <ArrowRight size={17} /></Link>
        </div>
      )}
      <p className="muted-note">
        Demo: enrollments are saved in this browser. Real accounts and lesson tracking aren't implemented.
      </p>
    </section>
  );
}

function About() {
  return (
    <section className="about-page page-section">
      <div className="about-icon"><GraduationCap size={42} /></div>
      <span className="section-kicker">ABOUT LEARNHUB</span>
      <h1>Learning should open doors<span>.</span></h1>
      <p>
        LearnHub is a demo learning platform for exploring programming,
        design, development and data science courses.
      </p>
      <div className="about-values">
        <div><BookOpen /><h3>Learn by exploring</h3><p>Discover topics that match your interests.</p></div>
        <div><Target /><h3>Grow at your pace</h3><p>Build a learning habit that works for you.</p></div>
        <div><GraduationCap /><h3>Keep moving forward</h3><p>Track your enrolled courses in one place.</p></div>
      </div>
      <Link to="/courses" className="primary-button">Explore courses <ArrowRight size={17} /></Link>
    </section>
  );
}

function Footer() {
  return (
    <footer className="footer">
      <Link to="/" className="brand">
        <span className="brand-icon"><BookOpen size={19} /></span>
        LearnHub<span className="brand-dot">.</span>
      </Link>
      <p>Learn something new. Every day.</p>
      <span>© {new Date().getFullYear()} LearnHub</span>
    </footer>
  );
}

function AppLayout() {
  return (
    <div className="app-shell">
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/courses/:id" element={<CourseDetails />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={
            <div className="empty-state page-section">
              <h2>Page not found</h2>
              <Link to="/" className="primary-button">Back home</Link>
            </div>
          } />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppLayout />
    </BrowserRouter>
  );
}
