// HPI 1.7-G
import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useInView } from 'framer-motion';
import { ArrowRight, Network, Cloud, Shield, Server, Mail, Code, ExternalLink, CheckCircle, Clock, Terminal, Cpu, Globe, Lock, Database, Wifi } from 'lucide-react';
import { BaseCrudService } from '@/integrations';
import { ITSectors, Projects, Certifications } from '@/entities';
import { Image } from '@/components/ui/image';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

// --- Utility Components for The Digital Nexus Design System ---

const GridBackground = () => (
  <div className="absolute inset-0 pointer-events-none z-0 overflow-hidden">
    <div className="absolute inset-0 bg-charcoal-background" />
    <div 
      className="absolute inset-0 opacity-[0.07]" 
      style={{
        backgroundImage: `linear-gradient(to right, #00FFFF 1px, transparent 1px), linear-gradient(to bottom, #00FFFF 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }}
    />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-charcoal-background/50 to-charcoal-background" />
  </div>
);

const TechBorder = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 pointer-events-none ${className}`}>
    <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-light-cyan-accent/50" />
    <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-light-cyan-accent/50" />
    <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-light-cyan-accent/50" />
    <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-light-cyan-accent/50" />
  </div>
);

const SectionHeading = ({ title, subtitle, align = "left" }: { title: string, subtitle?: string, align?: "left" | "center" | "right" }) => (
  <div className={`mb-16 ${align === "center" ? "text-center" : align === "right" ? "text-right" : "text-left"}`}>
    <motion.div 
      initial={{ opacity: 0, x: align === "right" ? 20 : -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="inline-flex items-center gap-2 mb-4"
    >
      <span className="h-[1px] w-8 bg-light-cyan-accent" />
      <span className="text-light-cyan-accent font-paragraph text-sm tracking-[0.2em] uppercase">System Module</span>
    </motion.div>
    <motion.h2 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground mb-4"
    >
      {title}
    </motion.h2>
    {subtitle && (
      <motion.p 
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.2 }}
        className="font-paragraph text-lg text-foreground/60 max-w-2xl mx-auto"
      >
        {subtitle}
      </motion.p>
    )}
  </div>
);

export default function HomePage() {
  // --- Data Fidelity Protocol: Canonical Data Sources ---
  const [sectors, setSectors] = useState<ITSectors[]>([]);
  const [projects, setProjects] = useState<Projects[]>([]);
  const [certifications, setCertifications] = useState<Certifications[]>([]);
  const [isLoadingSectors, setIsLoadingSectors] = useState(true);
  const [isLoadingProjects, setIsLoadingProjects] = useState(true);
  const [isLoadingCerts, setIsLoadingCerts] = useState(true);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  // --- Scroll Hooks for Parallax ---
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });
  
  const heroY = useTransform(scrollYProgress, [0, 0.2], ["0%", "50%"]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  useEffect(() => {
    loadSectors();
    loadProjects();
    loadCertifications();
  }, []);

  const loadSectors = async () => {
    try {
      const result = await BaseCrudService.getAll<ITSectors>('itsectors');
      setSectors(result.items);
    } catch (error) {
      console.error('Error loading sectors:', error);
    } finally {
      setIsLoadingSectors(false);
    }
  };

  const loadProjects = async () => {
    try {
      const result = await BaseCrudService.getAll<Projects>('projects');
      setProjects(result.items);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setIsLoadingProjects(false);
    }
  };

  const loadCertifications = async () => {
    try {
      const result = await BaseCrudService.getAll<Certifications>('certifications');
      setCertifications(result.items);
    } catch (error) {
      console.error('Error loading certifications:', error);
    } finally {
      setIsLoadingCerts(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      toast({
        title: "Transmission Successful",
        description: "Data packet received. Acknowledgment pending.",
      });
      setFormData({ name: '', email: '', message: '' });
      setIsSubmitting(false);
    }, 1000);
  };

  const getSectorIcon = (name: string) => {
    const lowerName = name?.toLowerCase() || '';
    const iconMap: Record<string, typeof Network> = {
      'network': Network,
      'cloud': Cloud,
      'virtual': Cloud,
      'security': Shield,
      'cyber': Shield,
      'system': Server,
      'admin': Server,
      'email': Mail,
      'dns': Mail,
      'automation': Code,
      'script': Code,
    };
    
    let matchedIcon = Server;
    for (const [key, icon] of Object.entries(iconMap)) {
      if (lowerName.includes(key)) {
        matchedIcon = icon;
        break;
      }
    }
    return matchedIcon;
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-background text-foreground selection:bg-light-cyan-accent/30 selection:text-light-cyan-accent overflow-clip">
      <style>{`
        .scanline {
          width: 100%;
          height: 100px;
          z-index: 10;
          background: linear-gradient(0deg, rgba(0,0,0,0) 0%, rgba(0, 255, 255, 0.05) 50%, rgba(0,0,0,0) 100%);
          opacity: 0.1;
          position: absolute;
          bottom: 100%;
          animation: scanline 10s linear infinite;
          pointer-events: none;
        }
        @keyframes scanline {
          0% { bottom: 100%; }
          100% { bottom: -100%; }
        }
        .glass-panel {
          background: rgba(36, 36, 56, 0.6);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(0, 255, 255, 0.1);
        }
        .text-glow {
          text-shadow: 0 0 20px rgba(0, 255, 255, 0.3);
        }
      `}</style>
      <Header />
      {/* --- HERO SECTION: The Command Center --- */}
      <section id="home" className="relative w-full h-screen flex items-center justify-center overflow-hidden">
        <GridBackground />
        <div className="scanline" />
        
        {/* Animated Network Nodes Background */}
        <div className="absolute inset-0 z-0">
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-1 h-1 bg-light-cyan-accent rounded-full"
              initial={{
                x: Math.random() * 100 + "%",
                y: Math.random() * 100 + "%",
                opacity: 0.2
              }}
              animate={{
                y: [null, Math.random() * 100 + "%"],
                opacity: [0.2, 0.5, 0.2]
              }}
              transition={{
                duration: Math.random() * 20 + 10,
                repeat: Infinity,
                ease: "linear"
              }}
            />
          ))}
        </div>

        <motion.div 
          style={{ y: heroY, opacity: heroOpacity }}
          className="relative z-10 w-full max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 flex flex-col items-start justify-center h-full"
        >
          <div className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-8">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, ease: "easeOut" }}
                className="mb-6 flex items-center gap-4"
              >
                <div className="px-4 py-1 border border-light-cyan-accent/30 bg-light-cyan-accent/5 rounded-full">
                  <span className="text-light-cyan-accent font-mono text-xs tracking-widest uppercase">System Online • Southend-on-Sea, UK</span>
                </div>
                <div className="h-[1px] flex-grow bg-gradient-to-r from-light-cyan-accent/30 to-transparent max-w-[200px]" />
              </motion.div>

              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-heading text-6xl md:text-8xl lg:text-9xl font-black leading-[0.9] tracking-tight mb-8 text-white mix-blend-overlay"
              >
                MICHAL<br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-light-cyan-accent to-electric-blue-accent text-glow">
                  SYSTEMS
                </span>
              </motion.h1>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="max-w-2xl border-l-2 border-light-cyan-accent/50 pl-6 mb-12"
              >
                <p className="font-paragraph text-xl md:text-2xl text-foreground/90 leading-relaxed">
                  IT Systems Administrator & Network Security Specialist.
                  <br />
                  <span className="text-foreground/60 text-lg mt-2 block">
                    Architecting secure, resilient infrastructure for the digital age.
                  </span>
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-wrap gap-6"
              >
                <Button
                  onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
                  className="bg-light-cyan-accent text-charcoal-background hover:bg-white font-bold text-lg px-8 py-6 rounded-none border border-transparent hover:border-light-cyan-accent transition-all duration-300"
                >
                  <Terminal className="mr-2 h-5 w-5" />
                  Initialize Protocol
                </Button>
                <Button
                  onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
                  variant="outline"
                  className="bg-transparent border border-foreground/20 text-foreground hover:border-light-cyan-accent hover:text-light-cyan-accent font-bold text-lg px-8 py-6 rounded-none transition-all duration-300"
                >
                  Establish Uplink
                </Button>
              </motion.div>
            </div>

            {/* Hero Visual - Abstract Server Rack / Data Stream */}
            <div className="hidden lg:block lg:col-span-4 relative h-[600px]">
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 1.2, delay: 0.4 }}
                className="absolute inset-0 border border-light-cyan-accent/10 bg-mid-gray-background/20 backdrop-blur-sm"
              >
                <TechBorder />
                <div className="p-8 h-full flex flex-col justify-between font-mono text-xs text-light-cyan-accent/70">
                  <div className="flex justify-between">
                    <span>CPU_LOAD: 12%</span>
                    <span>MEM: 64GB OK</span>
                  </div>
                  <div className="space-y-2 opacity-50">
                    <div className="h-1 w-full bg-light-cyan-accent/20 overflow-hidden">
                      <motion.div 
                        className="h-full bg-light-cyan-accent"
                        animate={{ width: ["0%", "100%"] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    </div>
                    <div className="h-1 w-3/4 bg-light-cyan-accent/20" />
                    <div className="h-1 w-1/2 bg-light-cyan-accent/20" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="border border-light-cyan-accent/20 p-4">
                      <div className="text-white mb-2">UPTIME</div>
                      <div className="text-2xl text-light-cyan-accent">99.9%</div>
                    </div>
                    <div className="border border-light-cyan-accent/20 p-4">
                      <div className="text-white mb-2">THREATS</div>
                      <div className="text-2xl text-electric-blue-accent">0</div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </section>
      {/* --- ABOUT SECTION: The Operator Profile --- */}
      <section id="about" className="relative w-full py-32 bg-charcoal-background overflow-hidden">
        <div className="absolute top-0 right-0 w-1/2 h-full bg-mid-gray-background/10 skew-x-12 transform origin-top-right" />
        
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            {/* Sticky Image Column */}
            <div className="lg:col-span-5 lg:sticky lg:top-32">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8 }}
                className="relative"
              >
                <div className="aspect-[4/5] w-full relative z-10 overflow-hidden border border-light-cyan-accent/20 bg-mid-gray-background">
                  <TechBorder />
                  <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-mid-gray-background to-charcoal-background">
                    <Server className="w-32 h-32 text-light-cyan-accent/20" />
                  </div>
                  {/* Placeholder for Profile Image if available, otherwise abstract tech graphic */}
                  <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-charcoal-background to-transparent">
                    <div className="font-mono text-xs text-light-cyan-accent mb-1">ID: MICHAL_ADMIN</div>
                    <div className="h-[1px] w-full bg-light-cyan-accent/30" />
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 border-t border-l border-electric-blue-accent/30" />
                <div className="absolute -bottom-4 -right-4 w-24 h-24 border-b border-r border-electric-blue-accent/30" />
              </motion.div>
            </div>

            {/* Content Column */}
            <div className="lg:col-span-7">
              <SectionHeading title="Operator Profile" subtitle="From Engineering to Firewall: A calculated trajectory into IT Infrastructure." />
              
              <div className="space-y-8 font-paragraph text-lg text-foreground/80 leading-relaxed">
                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="first-letter:text-5xl first-letter:font-bold first-letter:text-light-cyan-accent first-letter:mr-3 first-letter:float-left"
                >Welcome to my digital command center. I am Michal, an IT Systems and Network Administrator operating out of UK. My mission is simple: to build the invisible, resilient structures that power the modern world.</motion.p>
                
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                  className="p-6 border-l-2 border-electric-blue-accent bg-mid-gray-background/30"
                >

                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 }}
                >My journey represents a deliberate recalibration from the Mechanical Engineering sector to IT. This background provides me with a unique analytical lens—viewing network architecture not just as cables and code, but as critical assets requiring risk management, precision, and strategic foresight.</motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="grid grid-cols-2 gap-4 mt-8"
                >
                  <div className="flex items-center gap-3 text-foreground/70">
                    <Globe className="w-5 h-5 text-light-cyan-accent" />
                    <span>Network Architecture</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/70">
                    <Lock className="w-5 h-5 text-light-cyan-accent" />
                    <span>Cybersecurity Analysis</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/70">
                    <Database className="w-5 h-5 text-light-cyan-accent" />
                    <span>System Administration</span>
                  </div>
                  <div className="flex items-center gap-3 text-foreground/70">
                    <Cpu className="w-5 h-5 text-light-cyan-accent" />
                    <span>Infrastructure Automation</span>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* --- IT SECTORS: Active Modules --- */}
      <section id="sectors" className="relative w-full py-32 bg-background">
        <GridBackground />
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <SectionHeading title="Active Modules" subtitle="Core competencies deployed across the infrastructure stack." align="center" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {isLoadingSectors ? (
              // Loading Skeleton
              ([...Array(6)].map((_, i) => (
                <div key={i} className="h-64 bg-mid-gray-background/20 animate-pulse rounded-lg border border-white/5" />
              )))
            ) : sectors.length > 0 ? (
              sectors.map((sector, index) => {
                const IconComponent = getSectorIcon(sector.sectorName || '');
                return (
                  <motion.div
                    key={sector._id}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1, duration: 0.5 }}
                    className="group relative h-full"
                  >
                    <div className="absolute inset-0 bg-gradient-to-b from-light-cyan-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />
                    
                    <div className="relative h-full glass-panel p-8 rounded-xl overflow-hidden transition-all duration-300 group-hover:translate-y-[-5px] group-hover:shadow-[0_10px_30px_-10px_rgba(0,255,255,0.1)]">
                      {/* Tech Header */}
                      <div className="flex justify-between items-start mb-6">
                        <div className="p-3 bg-charcoal-background rounded-lg border border-light-cyan-accent/20 group-hover:border-light-cyan-accent/50 transition-colors">
                          <IconComponent className="w-8 h-8 text-light-cyan-accent" />
                        </div>
                        <span className="font-mono text-xs text-foreground/40">MOD_{index + 1 < 10 ? `0${index + 1}` : index + 1}</span>
                      </div>

                      <h3 className="font-heading text-2xl font-bold text-foreground mb-3 group-hover:text-light-cyan-accent transition-colors">
                        {sector.sectorName}
                      </h3>
                      
                      <p className="font-paragraph text-sm text-foreground/70 mb-6 leading-relaxed">
                        {sector.shortDescription}
                      </p>

                      {/* Keywords as "Tags" */}
                      {sector.keywords && (
                        <div className="flex flex-wrap gap-2 mt-auto">
                          {sector.keywords.split(',').slice(0, 3).map((keyword, i) => (
                            <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 bg-light-cyan-accent/5 border border-light-cyan-accent/10 text-light-cyan-accent/70 rounded">
                              {keyword.trim()}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Hover Reveal Link */}
                      {sector.learnMoreUrl && (
                        <div className="absolute bottom-0 left-0 right-0 p-4 bg-charcoal-background/90 backdrop-blur border-t border-light-cyan-accent/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-center">
                          <a href={sector.learnMoreUrl} target="_blank" rel="noopener noreferrer" className="flex items-center text-light-cyan-accent text-sm font-bold uppercase tracking-wider">
                            Access Data <ExternalLink className="ml-2 w-3 h-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })
            ) : (
              <div className="col-span-full text-center py-20 border border-dashed border-foreground/20 rounded-xl">
                <p className="font-mono text-foreground/50">NO MODULES DETECTED</p>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* --- PROJECTS & HOME LAB: Operation Logs --- */}
      <section id="projects" className="relative w-full py-32 bg-charcoal-background">
        <div className="max-w-[120rem] mx-auto px-6 md:px-12 lg:px-24">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            
            {/* Sticky Header & Network Viz */}
            <div className="lg:col-span-4 lg:sticky lg:top-32 h-fit">
              <SectionHeading title="Operation Logs" subtitle="Home Lab Topology & Project Archives." />
              
              {/* Enhanced Network Topology Visualization */}
              <div className="mt-12 p-6 border border-foreground/10 rounded-xl bg-mid-gray-background/20 relative overflow-y-auto max-h-[600px]">
                <div className="absolute top-4 left-4 text-xs font-mono text-foreground/40 z-20">NET_TOPOLOGY_V2.0</div>
                
                {/* Network Diagram - Based on provided topology */}
                <div className="relative w-full flex flex-col items-center justify-start gap-4 py-8 px-2">
                  {/* Internet ISP */}
                  <div className="w-20 h-10 border-2 border-light-cyan-accent rounded-full flex items-center justify-center bg-charcoal-background z-10 relative">
                    <Globe className="w-5 h-5 text-light-cyan-accent" />
                  </div>
                  <div className="text-[8px] text-light-cyan-accent font-mono whitespace-nowrap mb-1">Internet ISP</div>
                  <div className="h-6 w-[2px] bg-light-cyan-accent/40" />
                  
                  {/* Vodafone Router */}
                  <div className="w-24 h-10 border-2 border-electric-blue-accent rounded flex items-center justify-center bg-charcoal-background z-10 relative">
                    <Wifi className="w-5 h-5 text-electric-blue-accent mr-1" />
                    <span className="text-[8px] text-electric-blue-accent font-mono">Router</span>
                  </div>
                  <div className="text-[8px] text-electric-blue-accent font-mono whitespace-nowrap mb-1">Vodafone</div>
                  <div className="h-6 w-[2px] bg-electric-blue-accent/40" />
                  
                  {/* pfSense Firewall */}
                  <div className="w-24 h-10 border-2 border-light-cyan-accent rounded flex items-center justify-center bg-charcoal-background z-10 relative">
                    <Shield className="w-5 h-5 text-light-cyan-accent mr-1" />
                    <span className="text-[8px] text-light-cyan-accent font-mono">pfSense</span>
                  </div>
                  <div className="text-[8px] text-light-cyan-accent font-mono whitespace-nowrap mb-1">Firewall</div>
                  <div className="h-6 w-[2px] bg-light-cyan-accent/40" />
                  
                  {/* VLANs Row */}
                  <div className="flex gap-3 justify-center mb-2">
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-16 h-8 border border-electric-blue-accent/60 rounded flex items-center justify-center bg-charcoal-background/80">
                        <span className="text-[7px] text-electric-blue-accent font-mono">VLAN 10</span>
                      </div>
                      <span className="text-[7px] text-foreground/40 font-mono">IoT</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-16 h-8 border border-electric-blue-accent/60 rounded flex items-center justify-center bg-charcoal-background/80">
                        <span className="text-[7px] text-electric-blue-accent font-mono">VLAN 20</span>
                      </div>
                      <span className="text-[7px] text-foreground/40 font-mono">Cameras</span>
                    </div>
                    <div className="flex flex-col items-center gap-1">
                      <div className="w-16 h-8 border border-electric-blue-accent/60 rounded flex items-center justify-center bg-charcoal-background/80">
                        <span className="text-[7px] text-electric-blue-accent font-mono">Trunk</span>
                      </div>
                      <span className="text-[7px] text-foreground/40 font-mono">Port</span>
                    </div>
                  </div>
                  <div className="h-4 w-[2px] bg-electric-blue-accent/30" />
                  
                  {/* Core Switch */}
                  <div className="w-28 h-10 border-2 border-light-cyan-accent rounded flex items-center justify-center bg-charcoal-background z-10 relative">
                    <Server className="w-5 h-5 text-light-cyan-accent mr-1" />
                    <span className="text-[8px] text-light-cyan-accent font-mono">Core Switch</span>
                  </div>
                  <div className="text-[8px] text-light-cyan-accent font-mono whitespace-nowrap mb-1">Netgear</div>
                  <div className="h-4 w-[2px] bg-light-cyan-accent/40" />
                  
                  {/* Distribution Switch */}
                  <div className="w-28 h-10 border-2 border-electric-blue-accent rounded flex items-center justify-center bg-charcoal-background z-10 relative">
                    <Server className="w-5 h-5 text-electric-blue-accent mr-1" />
                    <span className="text-[8px] text-electric-blue-accent font-mono">Dist. Switch</span>
                  </div>
                  <div className="text-[8px] text-electric-blue-accent font-mono whitespace-nowrap mb-1">Lab</div>
                  <div className="h-4 w-[2px] bg-electric-blue-accent/40" />
                  
                  {/* Lab Servers */}
                  <div className="w-24 h-10 border-2 border-light-cyan-accent rounded flex items-center justify-center bg-charcoal-background z-10 relative">
                    <Database className="w-5 h-5 text-light-cyan-accent mr-1" />
                    <span className="text-[8px] text-light-cyan-accent font-mono">Lab Servers</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Scrollable Projects List */}
            <div className="lg:col-span-8 space-y-12">
              {isLoadingProjects ? (
                <div className="h-96 bg-mid-gray-background/20 animate-pulse rounded-xl" />
              ) : projects.length > 0 ? (
                projects.map((project, index) => (
                  <motion.div
                    key={project._id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6 }}
                    className="group relative"
                  >
                    <div className="absolute -left-4 top-0 bottom-0 w-1 bg-gradient-to-b from-light-cyan-accent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                    
                    <div className="bg-mid-gray-background/30 border border-foreground/10 rounded-xl overflow-hidden hover:border-light-cyan-accent/30 transition-all duration-500">
                      <div className="grid md:grid-cols-2 gap-0">
                        {/* Image Side */}
                        <div className="relative h-64 md:h-auto overflow-hidden">
                          <div className="absolute inset-0 bg-charcoal-background/20 group-hover:bg-transparent transition-colors z-10" />
                          {project.projectImage ? (
                            <Image
                              src={project.projectImage}
                              alt={project.projectName || 'Project'}
                              width={800}
                              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                            />
                          ) : (
                            <div className="w-full h-full bg-charcoal-background flex items-center justify-center">
                              <Code className="w-12 h-12 text-foreground/20" />
                            </div>
                          )}
                        </div>

                        {/* Content Side */}
                        <div className="p-8 flex flex-col justify-between">
                          <div>
                            <div className="flex justify-between items-start mb-4">
                              <h3 className="font-heading text-2xl font-bold text-foreground group-hover:text-light-cyan-accent transition-colors">
                                {project.projectName}
                              </h3>
                              {project.completionDate && (
                                <span className="text-xs font-mono text-foreground/40 border border-foreground/10 px-2 py-1 rounded">
                                  {new Date(project.completionDate).getFullYear()}
                                </span>
                              )}
                            </div>

                            <p className="font-paragraph text-foreground/70 mb-6 text-sm leading-relaxed">
                              {project.description}
                            </p>

                            {project.technologiesUsed && (
                              <div className="flex flex-wrap gap-2 mb-6">
                                {project.technologiesUsed.split(',').map((tech, i) => (
                                  <span key={i} className="text-xs font-mono text-electric-blue-accent">
                                    #{tech.trim()}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>

                          <div className="pt-6 border-t border-foreground/10 flex justify-between items-center">
                            {project.projectUrl ? (
                              <a href={project.projectUrl} target="_blank" rel="noopener noreferrer" className="inline-flex items-center text-sm font-bold text-foreground hover:text-light-cyan-accent transition-colors">
                                VIEW SOURCE <ArrowRight className="ml-2 w-4 h-4" />
                              </a>
                            ) : (
                              <span className="text-xs text-foreground/30 font-mono">INTERNAL ONLY</span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))
              ) : (
                <div className="text-center py-20">
                  <p className="font-mono text-foreground/50">ARCHIVES EMPTY</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {/* --- CERTIFICATIONS: Clearance Levels --- */}
      <section id="certifications" className="relative w-full py-32 bg-background overflow-hidden">
        <div className="absolute inset-0 opacity-30">
           <div className="absolute right-0 top-0 w-[500px] h-[500px] bg-electric-blue-accent/10 rounded-full blur-[100px]" />
        </div>

        <div className="max-w-[100rem] mx-auto px-6 md:px-12 lg:px-24 relative z-10">
          <SectionHeading title="Clearance Levels" subtitle="Verified credentials and active certifications." align="right" />

          <div className="mt-16 space-y-4">
            {isLoadingCerts ? (
              <div className="h-32 bg-mid-gray-background/20 animate-pulse rounded-lg" />
            ) : certifications.length > 0 ? (
              certifications.map((cert, index) => (
                <motion.div
                  key={cert._id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group relative bg-charcoal-background border border-foreground/10 hover:border-light-cyan-accent/50 p-6 md:p-8 rounded-lg transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row items-center gap-8">
                    {/* Status Indicator */}
                    <div className="hidden md:flex flex-col items-center justify-center w-24 shrink-0">
                      {cert.status === 'Completed' ? (
                        <div className="w-12 h-12 rounded-full bg-light-cyan-accent/10 flex items-center justify-center border border-light-cyan-accent/30">
                          <CheckCircle className="w-6 h-6 text-light-cyan-accent" />
                        </div>
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-electric-blue-accent/10 flex items-center justify-center border border-electric-blue-accent/30 animate-pulse">
                          <Clock className="w-6 h-6 text-electric-blue-accent" />
                        </div>
                      )}
                      <span className="mt-2 text-[10px] font-mono uppercase tracking-wider text-foreground/50">
                        {cert.status === 'Completed' ? 'VERIFIED' : 'PENDING'}
                      </span>
                    </div>

                    {/* Content */}
                    <div className="flex-grow text-center md:text-left">
                      <h3 className="font-heading text-2xl font-bold text-foreground mb-1">
                        {cert.certificationName}
                      </h3>
                      <p className="font-paragraph text-electric-blue-accent text-sm mb-4">
                        ISSUED BY: {cert.issuer?.toUpperCase()}
                      </p>
                      <p className="font-paragraph text-foreground/70 text-sm max-w-3xl">
                        {cert.description}
                      </p>
                    </div>

                    {/* Date & Action */}
                    <div className="flex flex-col items-center md:items-end gap-4 shrink-0 min-w-[150px]">
                      <div className="text-right">
                        <div className="text-[10px] text-foreground/40 font-mono uppercase">Date</div>
                        <div className="text-sm font-bold text-foreground">
                          {cert.completionDate 
                            ? new Date(cert.completionDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
                            : cert.expectedCompletionDate 
                              ? `EXP: ${new Date(cert.expectedCompletionDate).toLocaleDateString('en-US', { month: 'short', year: 'numeric' })}`
                              : 'N/A'}
                        </div>
                      </div>
                      
                      {cert.verificationUrl && (
                        <a 
                          href={cert.verificationUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-4 py-2 bg-mid-gray-background hover:bg-light-cyan-accent hover:text-charcoal-background text-xs font-bold uppercase tracking-wider rounded transition-colors duration-300"
                        >
                          Verify ID
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))
            ) : (
              <div className="text-center py-10">
                <p className="font-mono text-foreground/50">NO CREDENTIALS FOUND</p>
              </div>
            )}
          </div>
        </div>
      </section>
      {/* --- CONTACT: Establish Uplink --- */}
      <section id="contact" className="relative w-full py-32 bg-charcoal-background">
        <div className="max-w-4xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              className="w-20 h-20 mx-auto bg-light-cyan-accent/10 rounded-full flex items-center justify-center mb-6 border border-light-cyan-accent/30"
            >
              <Mail className="w-10 h-10 text-light-cyan-accent" />
            </motion.div>
            <h2 className="font-heading text-4xl md:text-5xl font-bold text-foreground mb-4">Establish Uplink</h2>
            <p className="font-paragraph text-foreground/60">Initiate secure communication channel.</p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-mid-gray-background/30 backdrop-blur-md border border-foreground/10 p-8 md:p-12 rounded-2xl relative overflow-hidden"
          >
            <TechBorder />
            
            <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label htmlFor="name" className="text-xs font-mono text-light-cyan-accent uppercase tracking-wider">Identity</label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                    className="bg-charcoal-background border-foreground/20 focus:border-light-cyan-accent h-12 font-paragraph"
                    placeholder="ENTER NAME"
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="email" className="text-xs font-mono text-light-cyan-accent uppercase tracking-wider">Return Address</label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                    className="bg-charcoal-background border-foreground/20 focus:border-light-cyan-accent h-12 font-paragraph"
                    placeholder="ENTER EMAIL"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-xs font-mono text-light-cyan-accent uppercase tracking-wider">Transmission Data</label>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  required
                  className="bg-charcoal-background border-foreground/20 focus:border-light-cyan-accent min-h-[150px] font-paragraph resize-none"
                  placeholder="ENTER MESSAGE CONTENT..."
                />
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-light-cyan-accent text-charcoal-background hover:bg-white font-bold text-lg h-14 rounded transition-all duration-300 uppercase tracking-widest"
              >
                {isSubmitting ? 'TRANSMITTING...' : 'SEND TRANSMISSION'}
              </Button>
            </form>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
