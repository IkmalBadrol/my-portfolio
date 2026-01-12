import React, { useState, useEffect, useRef } from 'react';
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code2,
  Terminal,
  Cpu,
  Globe,
  User,
  Briefcase,
  ChevronDown,
  Moon,
  Sun,
  Send,
  Sparkles,
  Zap,
  Layout,
  Database,
  Smartphone,
  ShieldCheck,
  BarChart3,
  X
} from 'lucide-react';

// Custom Hook for Scroll Animations
const useScrollReveal = () => {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.1 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => {
      if (ref.current) {
        observer.unobserve(ref.current);
      }
    };
  }, []);

  return [ref, isVisible];
};

const Reveal = ({ children, delay = 0 }) => {
  const [ref, isVisible] = useScrollReveal();
  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 transform ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
        }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const Portfolio = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [selectedProject, setSelectedProject] = useState(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [contactForm, setContactForm] = useState({ name: '', email: '', message: '' });
  const [submissionStatus, setSubmissionStatus] = useState('idle'); // 'idle', 'sending', 'success', 'error'

  // Handle scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const sections = ['home', 'about', 'skills', 'projects', 'experience', 'contact'];
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
          setActiveSection(section);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mouse move effect for background
  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setSelectedProject(null);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    if (!isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setSubmissionStatus('sending');

    try {
      const response = await fetch('https://formspree.io/f/ikmalbadrol29@gmail.com', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(contactForm)
      });

      if (response.ok) {
        setSubmissionStatus('success');
        setContactForm({ name: '', email: '', message: '' });
        // Reset status after 5 seconds
        setTimeout(() => setSubmissionStatus('idle'), 5000);
      } else {
        setSubmissionStatus('error');
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmissionStatus('error');
    }
  };

  const navLinks = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  const skills = {
    Languages: ["PHP", "C#", "Dart", "JavaScript", "SQL", "C++"],
    Frameworks: ["Flutter (BLOC)", "Laravel (Service Repository)", ".NET Core", "React.js", "Spring Boot"],
    "Cloud & DevOps": ["Docker", "Kubernetes", "Google Cloud", "Firebase", "CI/CD", "GitLab"],
    Databases: ["PostgreSQL", "MySQL", "Redis", "SQL Server", "SQLite"]
  };

  const projects = [
    {
      title: "Automated Regulatory Compliance Engine",
      description: "Led the architecture and development of a fully automated regulatory reporting solution built on Laravel (Service–Repository pattern) and PostgreSQL, containerized with Docker. Implemented scheduled workflows, data validation, fault-tolerant processing, and structured CSV outputs, resulting in complete elimination of manual reporting processes while maintaining strict regulatory accuracy and reliability.",
      tags: ["Laravel", "PostgreSQL", "Docker", "Automation", "RESTful API"],
      links: { demo: "#", code: "#" },
      color: "from-emerald-500 to-teal-600",
      icon: <ShieldCheck size={40} />
    },
    {
      title: "Crypto Exchange Mobile App",
      description: "Led the development of the cross-platform exchange application using Flutter and the BLOC pattern. Successfully managed the full lifecycle from feature implementation to deployment on the App Store and Google Play Store.",
      tags: ["Flutter (BLoC)", "Play Store/App Store", "iOS/Android Env"],
      links: { demo: "#", code: "#" },
      color: "from-blue-600 to-cyan-500",
      icon: <Smartphone size={40} />,
      // REPLACE with your local image path, e.g., "/images/my-app-screenshot.jpg"
      image: "/image_147c09.jpg"
    },
    {
      title: "Scalable Microservices Backend",
      description: "Developed and maintained containerized microservices using .NET Core, Laravel, and Go, implementing health checks, scaling strategies, and resilience patterns to support a high-availability, real-time digital asset trading ecosystem.",
      tags: [".NET Core", "Laravel", "Go Lang", "Docker", "SQL Server", "PostgreSQL", "Redis", "Web Socket", "RESTful API"],
      links: { demo: "#", code: "#" },
      color: "from-indigo-600 to-purple-600",
      icon: <Cpu size={40} />
    },
    {
      title: "Crypto Exchange Web Platforms",
      description: "Enhanced the core cryptocurrency exchange platform using React.js for user-facing trading interfaces and Angular for internal administrative dashboards, optimizing frontend performance, strengthening security controls, and improving overall user experience for mission-critical financial operations.",
      tags: ["React.js", "Angular"],
      links: { demo: "#", code: "#" },
      color: "from-amber-500 to-orange-600",
      icon: <Globe size={40} />,
      // REPLACE with your local image path
      image: "/image_147c09.jpg"
    },
    {
      title: "IOI City Mall OTS Integration",
      description: "Designed and developed user interfaces for the IOI Ticketing System using BootStrap, and jQuery, and for the POS system using WPF. Integrated CLUB IOI points redemption, cancellation, and earning functionality with OTS using .NET Framework.",
      tags: [".NET MVC", "WPF", "jQuery", "SQL Server"],
      links: { demo: "#", code: "#" },
      color: "from-pink-500 to-rose-500",
      icon: <Database size={40} />
    },
    {
      title: "Emergency Case Management",
      description: "Developed an Emergency Case Management system (Web & Mobile) integrated with Automated Traffic Clearance using IoT technology to streamline emergency response operations.",
      tags: ["IoT", "Bootstrap", "Laravel", "Flutter (BLoC)", "MySQL"],
      links: { demo: "#", code: "#" },
      color: "from-red-500 to-rose-600",
      icon: <Zap size={40} />
    },
    {
      title: "JomPick Parcel Management",
      description: "A comprehensive Parcel Management System (Mobile & Web) designed to streamline logistics and package handling operations for drivers and administrators.",
      tags: ["Flutter (BLoC)", "PHP", "MySQL"],
      links: { demo: "#", code: "#" },
      color: "from-slate-600 to-slate-800",
      icon: <Layout size={40} />
    }
  ];

  const experience = [
    {
      role: "Full Stack Developer",
      company: "SINEGY (Digital Asset Exchange)",
      period: "April 2025 - Present",
      description: "Lead mobile app development and deployment to App Store/Play Store. Architecting automated reporting systems for regulatory compliance, and maintaining and enhancing high-availability web front-end and backend microservices for Crypto Exchange."
    },
    {
      role: "Software Engineer Intern",
      company: "Longbow Solutions Sdn Bhd",
      period: "Oct 2024 - March 2025",
      description: "Developed SEO modules and enhance Online Ticketing System and Admin system for IOI City Mall and integrated 3rd party apps. Conducted UAT for Self-Service Kiosks and POS systems."
    },
    {
      role: "Computer Science Student",
      company: "Universiti Teknikal Malaysia Melaka",
      period: "Sep 2021 - March 2025",
      description: "Graduated with CGPA 3.71. Platinum Award in Innovation Competition and active participant in coding competitions."
    }
  ];

  return (
    <div className={`relative min-h-screen overflow-hidden transition-colors duration-500 ${isDarkMode ? 'bg-slate-950 text-slate-100' : 'bg-gray-50 text-gray-900'}`}>

      {/* Dynamic Background */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div
          className="absolute w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 transition-all duration-200"
          style={{
            background: isDarkMode ? 'radial-gradient(circle, rgba(251, 191, 36, 0.3) 0%, rgba(0,0,0,0) 70%)' : 'radial-gradient(circle, rgba(59, 130, 246, 0.2) 0%, rgba(255,255,255,0) 70%)',
            left: mousePos.x - 250,
            top: mousePos.y - 250
          }}
        />
        <div className={`absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full blur-[120px] opacity-20 animate-blob ${isDarkMode ? 'bg-indigo-600' : 'bg-blue-300'}`}></div>
        <div className={`absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full blur-[100px] opacity-20 animate-blob ${isDarkMode ? 'bg-amber-500' : 'bg-yellow-200'}`} style={{ animationDelay: '4s' }}></div>
        <div className={`absolute top-[40%] left-[30%] w-[400px] h-[400px] rounded-full blur-[100px] opacity-10 animate-blob ${isDarkMode ? 'bg-purple-500' : 'bg-pink-200'}`} style={{ animationDelay: '8s' }}></div>
      </div>

      {/* Navigation */}
      <nav className={`fixed w-full z-50 transition-all duration-300 ${isDarkMode ? 'bg-slate-950/80 border-slate-800' : 'bg-white/80 border-gray-200'} backdrop-blur-md border-b`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex-shrink-0 flex items-center gap-2 cursor-pointer" onClick={() => window.scrollTo(0, 0)}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                <span className="font-bold text-white text-xl">M</span>
              </div>
              <span className="text-xl font-bold tracking-tight">
                Ikmal<span className="text-amber-500"> Badrol</span>
              </span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${activeSection === link.name.toLowerCase()
                    ? 'bg-amber-500/10 text-amber-500'
                    : isDarkMode ? 'text-slate-400 hover:text-slate-100 hover:bg-white/5' : 'text-gray-600 hover:text-gray-900 hover:bg-black/5'
                    }`}
                >
                  {link.name}
                </a>
              ))}
              <div className="w-px h-6 bg-slate-700/50 mx-4"></div>
              <button
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-all duration-300 ${isDarkMode ? 'bg-slate-800 text-amber-400 hover:bg-slate-700' : 'bg-gray-100 text-slate-700 hover:bg-gray-200'
                  }`}
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className={`${isDarkMode ? 'text-amber-400' : 'text-slate-700'}`}
              >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className={`p-2 rounded-md ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}
              >
                <div className="space-y-1.5">
                  <span className={`block w-6 h-0.5 transform transition-transform ${isDarkMode ? 'bg-current' : 'bg-current'} ${isMenuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
                  <span className={`block w-6 h-0.5 transition-opacity ${isDarkMode ? 'bg-current' : 'bg-current'} ${isMenuOpen ? 'opacity-0' : ''}`}></span>
                  <span className={`block w-6 h-0.5 transform transition-transform ${isDarkMode ? 'bg-current' : 'bg-current'} ${isMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
                </div>
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className={`md:hidden absolute w-full px-4 pt-2 pb-6 border-b shadow-xl ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}>
            <div className="flex flex-col space-y-2 mt-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className={`block px-4 py-3 rounded-lg text-base font-medium ${activeSection === link.name.toLowerCase()
                    ? 'bg-amber-500/10 text-amber-500'
                    : isDarkMode ? 'text-slate-300 hover:bg-slate-800' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="min-h-screen flex items-center justify-center pt-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          <Reveal>
            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium mb-6 ${isDarkMode ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
              </span>
              Open to Opportunities
            </div>
          </Reveal>

          <Reveal delay={100}>
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 tracking-tight">
              Software Engineer <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-500 to-red-500 animate-gradient-x">
                Fintech Solutions
              </span>
            </h1>
          </Reveal>

          <Reveal delay={200}>
            <p className={`text-lg md:text-2xl mb-10 max-w-2xl mx-auto leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              I'm <span className="text-amber-500 font-semibold">Muhammad Ikmal</span>, a Software Engineer specializing in
              microservices, cross-platform development, and scalable ecosystems.
            </p>
          </Reveal>

          <Reveal delay={300}>
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <a
                href="#projects"
                className="group relative px-8 py-4 rounded-full bg-amber-500 text-slate-900 font-bold overflow-hidden transition-all hover:scale-105 hover:shadow-[0_0_40px_-10px_rgba(245,158,11,0.5)]"
              >
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-shimmer"></div>
                <span className="relative flex items-center gap-2">
                  View Projects <ChevronDown size={18} className="group-hover:translate-y-1 transition-transform" />
                </span>
              </a>
              <a
                href="#contact"
                className={`px-8 py-4 rounded-full border font-medium transition-all hover:scale-105 ${isDarkMode
                  ? 'border-slate-700 hover:bg-slate-800 text-slate-300'
                  : 'border-gray-300 hover:bg-white text-gray-700 hover:shadow-lg'
                  }`}
              >
                Contact Me
              </a>
            </div>
          </Reveal>

          <Reveal delay={400}>
            <div className={`mt-16 flex gap-8 ${isDarkMode ? 'text-slate-500' : 'text-gray-400'}`}>
              <a href="https://github.com/IkmalBadrol" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors transform hover:scale-110">
                <Github size={28} />
              </a>
              <a href="https://www.linkedin.com/in/ikmal-badrol/" target="_blank" rel="noopener noreferrer" className="hover:text-amber-500 transition-colors transform hover:scale-110">
                <Linkedin size={28} />
              </a>
              <a href="mailto:ikmalbadrol29@gmail.com" className="hover:text-amber-500 transition-colors transform hover:scale-110">
                <Mail size={28} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`py-24 relative z-10 ${isDarkMode ? 'bg-slate-900/50' : 'bg-white/50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className="grid md:grid-cols-2 gap-16 items-center">
              <div className="relative order-2 md:order-1">
                <div className={`absolute -inset-4 rounded-3xl opacity-30 blur-2xl ${isDarkMode ? 'bg-gradient-to-r from-amber-500 to-purple-600' : 'bg-gradient-to-r from-blue-400 to-cyan-300'}`}></div>
                <div className={`relative p-8 rounded-3xl border backdrop-blur-sm overflow-hidden ${isDarkMode ? 'bg-slate-900/90 border-slate-800' : 'bg-white/90 border-gray-200'}`}>
                  <div className="absolute top-0 right-0 p-4 opacity-20">
                    <Code2 size={120} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">Professional Objective</h3>
                  <p className={`mb-6 leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    As a Computer Science graduate with a CGPA of 3.71, I am committed to driving the evolution of Malaysia's digital finance ecosystem.
                  </p>
                  <p className={`leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                    I thrive in fast-paced environments, leveraging expertise in <span className="text-amber-500 font-semibold">microservices</span> and <span className="text-amber-500 font-semibold">cross-platform development</span> to solve challenging technical problems at scale.
                  </p>

                  <div className="mt-8 grid grid-cols-2 gap-4">
                    <div className="text-center p-4 rounded-xl bg-slate-500/5">
                      <div className="text-3xl font-bold text-amber-500">3.71</div>
                      <div className="text-xs uppercase tracking-wider opacity-70 mt-1">CGPA</div>
                    </div>
                    <div className="text-center p-4 rounded-xl bg-slate-500/5">
                      <div className="text-3xl font-bold text-amber-500">4+</div>
                      <div className="text-xs uppercase tracking-wider opacity-70 mt-1">Projects</div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="order-1 md:order-2">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">About <span className="text-amber-500">Me</span></h2>
                <p className={`text-lg mb-8 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  I am a Full Stack Developer with a proven track record in end-to-end delivery of mobile and web ecosystems.
                </p>
                <div className="space-y-4">
                  {[
                    { title: "Mobile & Web", desc: "Flutter, React, and Angular Expert", icon: <Layout className="text-amber-500" /> },
                    { title: "Scalable Backend", desc: ".NET Core, Laravel, Node.js Microservices", icon: <Terminal className="text-purple-500" /> },
                    { title: "DevOps & Cloud", desc: "Docker, Kubernetes, GCP Deployment", icon: <Globe className="text-blue-500" /> },
                  ].map((item, i) => (
                    <div key={i} className={`flex items-center gap-4 p-4 rounded-xl transition-all hover:translate-x-2 ${isDarkMode ? 'hover:bg-white/5' : 'hover:bg-black/5'}`}>
                      <div className={`p-3 rounded-lg ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold">{item.title}</h4>
                        <p className={`text-sm ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Skills Marquee Section */}
      <section id="skills" className="py-24 overflow-hidden">
        <div className="text-center mb-16">
          <Reveal>
            <h2 className="text-4xl font-bold mb-4">Tech <span className="text-amber-500">Arsenal</span></h2>
            <p className={`max-w-2xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
              The tools and technologies I use to bring ideas to life.
            </p>
          </Reveal>
        </div>

        <div className="relative w-full">
          <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-slate-950 to-transparent z-10 hidden md:block"></div>
          <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-slate-950 to-transparent z-10 hidden md:block"></div>

          <div className="flex gap-4 animate-scroll whitespace-nowrap py-4">
            {/* Duplicate the list for seamless loop */}
            {[...Object.values(skills).flat(), ...Object.values(skills).flat()].map((skill, i) => (
              <div
                key={i}
                className={`inline-flex items-center gap-2 px-6 py-3 rounded-full border text-lg font-medium transition-all hover:scale-105 hover:border-amber-500 cursor-default ${isDarkMode
                  ? 'bg-slate-900/50 border-slate-800 text-slate-300'
                  : 'bg-white border-gray-200 text-gray-700 shadow-sm'
                  }`}
              >
                {skill}
              </div>
            ))}
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 mt-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {Object.entries(skills).map(([category, items], idx) => (
              <Reveal key={category} delay={idx * 100}>
                <div className={`p-6 rounded-2xl h-full ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white border border-gray-100 shadow-lg'}`}>
                  <h3 className="text-amber-500 font-bold mb-4">{category}</h3>
                  <div className="flex flex-wrap gap-2">
                    {items.map(skill => (
                      <span key={skill} className={`text-xs px-2 py-1 rounded-md ${isDarkMode ? 'bg-slate-800' : 'bg-gray-100'}`}>
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Bento Grid */}
      <section id="projects" className={`py-24 relative z-10 ${isDarkMode ? 'bg-slate-900/30' : 'bg-gray-50'}`}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
            <Reveal>
              <div>
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured <span className="text-amber-500">Work</span></h2>
                <p className={`${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>Highlights from my portfolio. Click on a project to view details.</p>
              </div>
            </Reveal>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {projects.map((project, i) => (
              <Reveal key={i} delay={i * 100}>
                <div
                  onClick={() => setSelectedProject(project)}
                  className={`group relative h-full rounded-3xl overflow-hidden p-8 flex flex-col justify-between transition-all duration-300 hover:shadow-2xl hover:scale-[1.02] cursor-pointer ${i === 0 ? 'md:col-span-2' : 'md:col-span-1'
                    } ${isDarkMode ? 'bg-slate-900 border border-slate-800' : 'bg-white shadow-lg'}`}>

                  {/* Background Gradient */}
                  <div className={`absolute inset-0 bg-gradient-to-br opacity-10 group-hover:opacity-20 transition-opacity duration-500 ${project.color}`}></div>
                  <div className="absolute -right-10 -bottom-10 opacity-10 transform group-hover:scale-110 transition-transform duration-700 rotate-12">
                    {project.icon}
                  </div>

                  <div className="relative z-10">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 bg-gradient-to-br ${project.color} text-white shadow-lg`}>
                      {project.icon}
                    </div>
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-amber-500 transition-colors">{project.title}</h3>
                    <p className={`line-clamp-3 ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                      {project.description}
                    </p>
                  </div>

                  <div className="relative z-10 flex flex-wrap gap-2 mt-6">
                    {project.tags.slice(0, 3).map(tag => (
                      <span key={tag} className={`text-xs px-3 py-1 rounded-full backdrop-blur-md ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}>
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 3 && (
                      <span className={`text-xs px-3 py-1 rounded-full backdrop-blur-md ${isDarkMode ? 'bg-white/10' : 'bg-black/5'}`}>
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* Hover visual cue */}
                  <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className={`p-2 rounded-full ${isDarkMode ? 'bg-white/10 text-white' : 'bg-black/5 text-black'}`}>
                      <ExternalLink size={16} />
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Project Modal */}
      {selectedProject && (
        <div
          className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm transition-all duration-300"
          onClick={() => setSelectedProject(null)}
        >
          <div
            className={`relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200 ${isDarkMode ? 'bg-slate-900 border border-slate-700' : 'bg-white'}`}
            onClick={e => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelectedProject(null)}
              className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-20 ${isDarkMode ? 'hover:bg-slate-800 text-slate-400 hover:text-white' : 'hover:bg-gray-100 text-gray-500 hover:text-gray-900'}`}
            >
              <X size={24} />
            </button>

            {/* Modal Content */}
            <div className="p-8 pt-12 md:pt-8">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${selectedProject.color} text-white shadow-lg`}>
                  {selectedProject.icon}
                </div>
                <h2 className="text-2xl md:text-3xl font-bold pr-8">{selectedProject.title}</h2>
              </div>

              <div className="flex flex-wrap gap-2 mb-6">
                {selectedProject.tags.map(tag => (
                  <span key={tag} className={`text-sm px-3 py-1 rounded-full font-medium ${isDarkMode ? 'bg-amber-500/10 text-amber-500 border border-amber-500/20' : 'bg-blue-50 text-blue-600 border border-blue-100'}`}>
                    {tag}
                  </span>
                ))}
              </div>

              <div className={`prose max-w-none mb-8 ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>
                <p className="text-lg leading-relaxed">{selectedProject.description}</p>
              </div>

              <div className="flex gap-4 pt-6 border-t border-slate-200 dark:border-slate-800">
                <button
                  disabled
                  className={`flex-1 py-3 rounded-xl font-bold flex items-center justify-center gap-2 transition-all opacity-50 cursor-not-allowed ${isDarkMode ? 'bg-slate-800 text-white' : 'bg-gray-100 text-gray-900'}`}
                >
                  <Github size={20} />
                  View Code
                </button>
                <button
                  disabled
                  className="flex-1 py-3 rounded-xl bg-amber-500 text-white font-bold flex items-center justify-center gap-2 transition-all shadow-lg shadow-amber-500/25 opacity-50 cursor-not-allowed"
                >
                  <ExternalLink size={20} />
                  Live Demo
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Experience Section */}
      <section id="experience" className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <h2 className="text-4xl font-bold mb-16 text-center">Career <span className="text-amber-500">Timeline</span></h2>
          </Reveal>

          <div className="relative space-y-12">
            <div className={`absolute left-[28px] md:left-1/2 top-0 bottom-0 w-0.5 -ml-px ${isDarkMode ? 'bg-slate-800' : 'bg-gray-200'}`}></div>

            {experience.map((job, index) => (
              <Reveal key={index} delay={index * 100}>
                <div className={`relative flex items-center gap-8 ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>

                  {/* Spacer for desktop alignment */}
                  <div className="hidden md:block w-1/2" />

                  {/* Timeline Dot */}
                  <div className={`absolute left-[16px] md:left-1/2 -translate-x-1/2 w-6 h-6 rounded-full border-4 z-10 ${isDarkMode ? 'bg-slate-950 border-amber-500' : 'bg-white border-amber-500'
                    }`}></div>

                  {/* Content Card */}
                  <div className={`flex-1 ml-16 md:ml-0 ${index % 2 === 0 ? 'md:text-left' : 'md:text-right'}`}>
                    <div className={`p-6 rounded-2xl border transition-all hover:-translate-y-1 hover:shadow-xl ${isDarkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-100 shadow-lg'
                      }`}>
                      <span className="text-amber-500 font-bold text-sm tracking-wider uppercase mb-2 block">{job.period}</span>
                      <h3 className="text-xl font-bold mb-1">{job.role}</h3>
                      <h4 className={`text-base mb-4 font-medium ${isDarkMode ? 'text-slate-300' : 'text-gray-600'}`}>{job.company}</h4>
                      <p className={`text-sm leading-relaxed ${isDarkMode ? 'text-slate-400' : 'text-gray-500'}`}>
                        {job.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`py-24 relative z-10 ${isDarkMode ? 'bg-slate-900/50' : 'bg-gray-50'}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Reveal>
            <div className={`rounded-[3rem] p-8 md:p-16 text-center border overflow-hidden relative ${isDarkMode ? 'bg-slate-950 border-slate-800' : 'bg-white border-white shadow-2xl'}`}>

              {/* Decor */}
              <div className="absolute top-0 left-0 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl translate-x-1/2 translate-y-1/2"></div>

              <div className="relative z-10">
                <h2 className="text-4xl md:text-5xl font-bold mb-6">Let's Build Something <br /><span className="text-amber-500">Amazing</span></h2>
                <p className={`text-lg mb-10 max-w-xl mx-auto ${isDarkMode ? 'text-slate-400' : 'text-gray-600'}`}>
                  Whether you have a question, a project proposition, or just want to say hi, I'll try my best to get back to you!
                </p>

                {/* Direct Contact Links */}
                <div className="flex flex-wrap justify-center gap-4 mb-10">
                  <a href="https://github.com/IkmalBadrol" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all transform hover:-translate-y-1 ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}>
                    <Github size={20} />
                    <span>GitHub</span>
                  </a>
                  <a href="https://www.linkedin.com/in/ikmal-badrol/" target="_blank" rel="noopener noreferrer" className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all transform hover:-translate-y-1 ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}>
                    <Linkedin size={20} />
                    <span>LinkedIn</span>
                  </a>
                  <a href="mailto:ikmalbadrol29@gmail.com" className={`flex items-center gap-2 px-5 py-3 rounded-full font-medium transition-all transform hover:-translate-y-1 ${isDarkMode ? 'bg-slate-800 hover:bg-slate-700 text-white' : 'bg-gray-100 hover:bg-gray-200 text-gray-900'}`}>
                    <Mail size={20} />
                    <span>Email</span>
                  </a>
                </div>

                <form className="max-w-md mx-auto space-y-4 text-left" onSubmit={handleContactSubmit}>
                  <div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Your Name"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className={`w-full px-6 py-4 rounded-full outline-none border focus:ring-2 focus:ring-amber-500 transition-all ${isDarkMode
                        ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'
                        : 'bg-gray-50 border-gray-200 placeholder-gray-400'
                        }`}
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      name="email"
                      placeholder="Enter your email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className={`w-full px-6 py-4 rounded-full outline-none border focus:ring-2 focus:ring-amber-500 transition-all ${isDarkMode
                        ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'
                        : 'bg-gray-50 border-gray-200 placeholder-gray-400'
                        }`}
                    />
                  </div>
                  <div>
                    <textarea
                      rows="4"
                      name="message"
                      placeholder="Your message"
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className={`w-full px-6 py-4 rounded-3xl outline-none border focus:ring-2 focus:ring-amber-500 transition-all ${isDarkMode
                        ? 'bg-slate-900 border-slate-800 text-white placeholder-slate-500'
                        : 'bg-gray-50 border-gray-200 placeholder-gray-400'
                        }`}
                    ></textarea>
                  </div>
                  <button
                    type="submit"
                    disabled={submissionStatus === 'sending'}
                    className={`w-full py-4 rounded-full bg-gradient-to-r from-amber-500 to-orange-600 text-white font-bold hover:shadow-[0_0_30px_-5px_rgba(245,158,11,0.6)] transition-all transform hover:scale-[1.02] flex items-center justify-center gap-2 ${submissionStatus === 'sending' ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {submissionStatus === 'sending' ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        Sending...
                      </>
                    ) : submissionStatus === 'success' ? (
                      'Message Sent!'
                    ) : submissionStatus === 'error' ? (
                      'Try Again'
                    ) : (
                      'Send Message'
                    )}
                  </button>
                  {submissionStatus === 'success' && (
                    <p className="text-emerald-500 text-center text-sm mt-4 animate-in fade-in slide-in-from-top-2">
                      Thanks! Your message has been sent successfully.
                    </p>
                  )}
                  {submissionStatus === 'error' && (
                    <p className="text-red-500 text-center text-sm mt-4">
                      Oops! Something went wrong. Please try again later.
                    </p>
                  )}
                </form>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Footer */}
      <footer className={`py-12 border-t text-center ${isDarkMode ? 'border-slate-800 bg-slate-950 text-slate-500' : 'border-gray-200 bg-white text-gray-500'}`}>
        {/* <div className="flex items-center justify-center gap-2 mb-4">
          <div className="w-8 h-8 rounded-lg bg-amber-500 flex items-center justify-center text-white font-bold">M</div>
        </div> */}
        <p className="text-sm">
          {/* © {new Date().getFullYear()} Muhammad Ikmal. Built with React. */}
          Let's Connect!
        </p>
      </footer>

      <style>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        ::-webkit-scrollbar {
          display: none;
        }
        
        /* Hide scrollbar for IE, Edge and Firefox */
        * {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }

        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 15s infinite;
        }
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
        .animate-gradient-x {
          background-size: 200% 200%;
          animation: gradient-x 5s ease infinite;
        }
        @keyframes gradient-x {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        .animate-shimmer {
          animation: shimmer 2s infinite;
        }
      `}</style>
    </div>
  );
};

export default Portfolio;