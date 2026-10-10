import React, { useState } from 'react';
import { SEO } from '../lib/seo';
import { careersData } from '../content/careers';
import { JobOpening } from '../types';
import { Briefcase, MapPin, Clock, ArrowRight, CheckCircle2, X, Upload } from 'lucide-react';

export const CareersPage: React.FC = () => {
  const [selectedJob, setSelectedJob] = useState<JobOpening | null>(null);
  const [isApplicationSubmitted, setIsApplicationSubmitted] = useState(false);
  const [applicantName, setApplicantName] = useState('');
  const [applicantEmail, setApplicantEmail] = useState('');
  const [applicantPhone, setApplicantPhone] = useState('');
  const [coverNote, setCoverNote] = useState('');
  const [resumeFileName, setResumeFileName] = useState('');

  const handleApplyClick = (job: JobOpening) => {
    setSelectedJob(job);
    setIsApplicationSubmitted(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsApplicationSubmitted(true);
    setTimeout(() => {
      setSelectedJob(null);
      setIsApplicationSubmitted(false);
      setApplicantName('');
      setApplicantEmail('');
      setApplicantPhone('');
      setCoverNote('');
      setResumeFileName('');
    }, 2800);
  };

  return (
    <div className="min-h-screen bg-[#FAF8F4] pt-28 pb-20">
      <SEO
        title="Careers & Opportunities | CKD Pharma Pakistan"
        description="Join CKD Pharma. Career opportunities in pharmaceutical quality assurance, formulation science, production engineering, and healthcare sales across Pakistan."
        canonicalPath="/careers"
        breadcrumbs={[
          { name: 'Home', url: '/' },
          { name: 'Careers', url: '/careers' }
        ]}
      />

      <section className="pt-8 pb-16 gradient-calm border-b border-[#0E2A2B]/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A]">
              05 — CAREERS & TALENT
            </span>
            <h1 className="font-serif-editorial text-4xl sm:text-5xl md:text-6xl font-normal text-[#0E2A2B] leading-tight text-balance">
              Build your pharmaceutical career with a <span className="italic font-serif">culture of excellence</span>.
            </h1>
            <p className="text-base sm:text-lg text-[#5B6B6C] leading-relaxed">
              We empower pharmacists, chemical engineers, microbiologists, and commercial specialists with advanced technical training and career development in Pakistan.
            </p>
          </div>
        </div>
      </section>

      {/* Why Join CKD */}
      <section className="py-16 border-b border-[#0E2A2B]/8 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 rounded-xl border border-[#0E2A2B]/8 bg-[#FAF8F4] space-y-2">
              <h3 className="font-bold text-sm text-[#0E2A2B]">Continuous Technical Training</h3>
              <p className="text-xs text-[#5B6B6C] leading-relaxed">
                Structured cGMP, GLP, and pharmacopoeial monograph seminars conducted in partnership with leading regulatory consultants.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-[#0E2A2B]/8 bg-[#FAF8F4] space-y-2">
              <h3 className="font-bold text-sm text-[#0E2A2B]">State-of-the-Art Labs</h3>
              <p className="text-xs text-[#5B6B6C] leading-relaxed">
                Work hands-on with high-end analytical instruments (HPLC, GC, UV-Vis, FTIR) and automated cleanroom manufacturing suites.
              </p>
            </div>
            <div className="p-6 rounded-xl border border-[#0E2A2B]/8 bg-[#FAF8F4] space-y-2">
              <h3 className="font-bold text-sm text-[#0E2A2B]">Comprehensive Benefits</h3>
              <p className="text-xs text-[#5B6B6C] leading-relaxed">
                Competitive compensation, provident fund, medical insurance coverage for employee & family, and annual performance bonuses.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Current Job Openings */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6">
          <div className="max-w-2xl mb-12">
            <span className="text-xs uppercase tracking-widest font-bold text-[#0F5E5A] block mb-2">
              OPEN POSITIONS
            </span>
            <h2 className="font-serif-editorial text-3xl sm:text-4xl font-normal text-[#0E2A2B]">
              Current Vacancies in Lahore & Karachi
            </h2>
          </div>

          <div className="space-y-6">
            {careersData.map((job) => (
              <div
                key={job.id}
                className="p-6 sm:p-8 rounded-2xl bg-white border border-[#0E2A2B]/10 shadow-xs hover:border-[#0E2A2B]/20 transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-3 max-w-2xl">
                  <div className="flex flex-wrap items-center gap-3 text-xs text-[#5B6B6C]">
                    <span className="font-semibold text-[#0F5E5A]">{job.department}</span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5" />
                      <span>{job.location}</span>
                    </span>
                    <span>·</span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      <span>{job.employmentType} ({job.experience})</span>
                    </span>
                  </div>

                  <h3 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B]">
                    {job.title}
                  </h3>

                  <p className="text-xs text-[#5B6B6C] leading-relaxed">
                    {job.description}
                  </p>

                  <div className="pt-2">
                    <span className="text-[11px] font-semibold text-[#0E2A2B] block mb-1">Key Requirements:</span>
                    <ul className="text-xs text-[#5B6B6C] space-y-1 list-disc pl-5">
                      {job.requirements.slice(0, 2).map((req, idx) => (
                        <li key={idx}>{req}</li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="shrink-0">
                  <button
                    onClick={() => handleApplyClick(job)}
                    className="w-full sm:w-auto px-6 py-3 rounded-lg bg-[#0E2A2B] text-[#FAF8F4] text-xs font-semibold hover:bg-[#0F5E5A] transition-colors flex items-center justify-center gap-2 group"
                  >
                    <span>Apply for this Position</span>
                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" strokeWidth={1.5} />
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 p-8 rounded-2xl bg-[#E6F3F2]/60 border border-[#0F5E5A]/20 text-center space-y-3">
            <h3 className="text-base font-bold text-[#0E2A2B]">Don&apos;t see an exact opening for your specialization?</h3>
            <p className="text-xs text-[#5B6B6C] max-w-md mx-auto">
              We are constantly welcoming talented pharmacists, analytical chemists, and regulatory specialists. Submit your spontaneous profile to our human resources repository.
            </p>
            <a
              href="mailto:careers@ckdpharma.com?subject=Spontaneous%20Application%20-%20CKD%20Pharma"
              className="inline-flex items-center gap-2 text-xs font-semibold text-[#0F5E5A] hover:underline pt-1"
            >
              <span>Email CV to careers@ckdpharma.com</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </section>

      {/* Application Modal */}
      {selectedJob && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0E2A2B]/40 backdrop-blur-xs animate-in fade-in duration-200">
          <div className="bg-[#FAF8F4] rounded-2xl border border-[#0E2A2B]/10 shadow-2xl max-w-xl w-full p-6 sm:p-8 max-h-[90vh] overflow-y-auto relative">
            <button
              onClick={() => setSelectedJob(null)}
              className="absolute top-5 right-5 p-2 text-[#5B6B6C] hover:text-[#0E2A2B] rounded-lg"
              aria-label="Close application form"
            >
              <X className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {isApplicationSubmitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-14 h-14 mx-auto rounded-full bg-[#0F5E5A]/10 text-[#0F5E5A] flex items-center justify-center">
                  <CheckCircle2 className="w-8 h-8" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B]">
                  Application Received
                </h3>
                <p className="text-xs text-[#5B6B6C] max-w-sm mx-auto leading-relaxed">
                  Thank you, {applicantName}. Your application for <strong>{selectedJob.title}</strong> has been logged in our recruitment portal. Our talent acquisition committee will reach out to you via {applicantEmail}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <span className="text-[11px] font-bold text-[#0F5E5A] uppercase tracking-wider">
                    Position Application
                  </span>
                  <h3 className="font-serif-editorial text-2xl font-bold text-[#0E2A2B] mt-0.5">
                    {selectedJob.title}
                  </h3>
                  <p className="text-xs text-[#5B6B6C]">{selectedJob.location} · {selectedJob.department}</p>
                </div>

                <div className="space-y-3 pt-2">
                  <div>
                    <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                      Full Legal Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={applicantName}
                      onChange={(e) => setApplicantName(e.target.value)}
                      placeholder="e.g. Dr. Muhammad Hamza, Pharm.D"
                      className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-white text-[#0E2A2B] outline-none focus:border-[#0F5E5A]"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        value={applicantEmail}
                        onChange={(e) => setApplicantEmail(e.target.value)}
                        placeholder="hamza@example.com"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-white text-[#0E2A2B] outline-none focus:border-[#0F5E5A]"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                        Phone / WhatsApp *
                      </label>
                      <input
                        type="tel"
                        required
                        value={applicantPhone}
                        onChange={(e) => setApplicantPhone(e.target.value)}
                        placeholder="0300-1234567"
                        className="w-full text-xs px-3.5 py-2.5 rounded-lg border border-[#0E2A2B]/15 bg-white text-[#0E2A2B] outline-none focus:border-[#0F5E5A]"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                      Upload Curriculum Vitae (PDF / DOCX) *
                    </label>
                    <div className="relative border-2 border-dashed border-[#0E2A2B]/20 rounded-xl p-4 text-center bg-white hover:border-[#0F5E5A] transition-colors cursor-pointer">
                      <input
                        type="file"
                        accept=".pdf,.doc,.docx"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            setResumeFileName(e.target.files[0].name);
                          }
                        }}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        required={!resumeFileName}
                      />
                      <Upload className="w-5 h-5 mx-auto text-[#0F5E5A] mb-1" strokeWidth={1.5} />
                      <span className="text-xs font-medium text-[#0E2A2B] block">
                        {resumeFileName ? resumeFileName : 'Click to select or drop CV file'}
                      </span>
                      <span className="text-[10px] text-[#5B6B6C]">Max 10 MB (PDF preferred)</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-[#0E2A2B] mb-1">
                      Brief Statement of Qualifications & Experience
                    </label>
                    <textarea
                      rows={3}
                      value={coverNote}
                      onChange={(e) => setCoverNote(e.target.value)}
                      placeholder="Highlight relevant laboratory techniques, cGMP experience, or academic credentials..."
                      className="w-full text-xs p-3 rounded-lg border border-[#0E2A2B]/15 bg-white text-[#0E2A2B] outline-none focus:border-[#0F5E5A]"
                    />
                  </div>
                </div>

                <div className="pt-3 flex items-center justify-end gap-3 border-t border-[#0E2A2B]/8">
                  <button
                    type="button"
                    onClick={() => setSelectedJob(null)}
                    className="px-4 py-2 text-xs font-medium text-[#5B6B6C] hover:text-[#0E2A2B]"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-lg bg-[#0F5E5A] text-[#FAF8F4] text-xs font-semibold hover:bg-[#0A4542] transition-colors"
                  >
                    Submit Application
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
