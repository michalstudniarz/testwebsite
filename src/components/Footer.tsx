import { Network, Mail, Linkedin, Github } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-background border-t border-light-cyan-accent/20">
      <div className="max-w-[100rem] mx-auto px-8 md:px-20 py-12 md:py-16">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          {/* Brand Section */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-light-cyan-accent/10 rounded-lg flex items-center justify-center">
                <Network className="w-6 h-6 text-light-cyan-accent" />
              </div>
              <span className="font-heading text-xl font-bold text-foreground">
                Michal
              </span>
            </div>
            <p className="font-paragraph text-sm text-foreground/70 leading-relaxed">
              IT Systems Administrator specializing in network architecture, 
              cybersecurity, and cloud infrastructure solutions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-heading text-lg font-bold text-light-cyan-accent mb-4">
              Quick Links
            </h3>
            <ul className="space-y-2">
              {[
                { name: 'About Me', href: '#about' },
                { name: 'IT Sectors', href: '#sectors' },
                { name: 'Projects', href: '#projects' },
                { name: 'Certifications', href: '#certifications' },
                { name: 'Contact', href: '#contact' },
              ].map((link) => (
                <li key={link.name}>
                  <button
                    onClick={() => document.querySelector(link.href)?.scrollIntoView({ behavior: 'smooth' })}
                    className="font-paragraph text-sm text-foreground/70 hover:text-light-cyan-accent transition-colors duration-300"
                  >
                    {link.name}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-heading text-lg font-bold text-light-cyan-accent mb-4">
              Connect
            </h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-light-cyan-accent" />
                <span className="font-paragraph text-sm text-foreground/70">
                  Available via contact form
                </span>
              </div>
              <div className="flex items-center gap-4 mt-4">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-10 h-10 bg-mid-gray-background hover:bg-light-cyan-accent/20 rounded-lg flex items-center justify-center transition-colors duration-300 group"
                  aria-label="Contact"
                >
                  <Mail className="w-5 h-5 text-light-cyan-accent" />
                </a>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-mid-gray-background hover:bg-light-cyan-accent/20 rounded-lg flex items-center justify-center transition-colors duration-300 group"
                  aria-label="LinkedIn"
                >
                  <Linkedin className="w-5 h-5 text-light-cyan-accent" />
                </a>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-mid-gray-background hover:bg-light-cyan-accent/20 rounded-lg flex items-center justify-center transition-colors duration-300 group"
                  aria-label="GitHub"
                >
                  <Github className="w-5 h-5 text-light-cyan-accent" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-light-cyan-accent/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="font-paragraph text-sm text-foreground/60">
              © {currentYear} Michal. All rights reserved.
            </p>
            <p className="font-paragraph text-sm text-foreground/60">
              Southend-on-Sea, England
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
