import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { roadmapsApi, resolveMediaUrl } from "../../Shared/utils/api";
import { jsPDF } from "jspdf";
import {
  Home, Code, Layers, Rocket, Trophy, Clock, CircleCheck,
  Circle, Calendar, BarChart, ListTodo, ArrowLeft, CheckCircle, Download
} from "lucide-react";

const iconMap = {
  Home: Home,
  Code: Code,
  Layers: Layers,
  Rocket: Rocket,
  Trophy: Trophy,
};

const RoadmapDetail = () => {
  const { id } = useParams();
  const [roadmap, setRoadmap] = useState(null);
  const [loading, setLoading] = useState(true);
  const [progress, setProgress] = useState({});
  const [pdfCompleted, setPdfCompleted] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const { data } = await roadmapsApi.getById(id);
        setRoadmap(data);
        
        // Load progress from localStorage
        if (data.contentType === "text") {
          const saved = localStorage.getItem(`roadmap_progress_${data._id}`);
          if (saved) {
            setProgress(JSON.parse(saved));
          } else {
            const initial = {};
            data.steps?.forEach((_, i) => {
              initial[i] = i === 0 ? "in-progress" : "upcoming";
            });
            setProgress(initial);
          }
        } else {
          // PDF Progress
          const savedPdf = localStorage.getItem(`roadmap_pdf_completed_${data._id}`);
          if (savedPdf) {
            setPdfCompleted(JSON.parse(savedPdf));
          }
        }
      } catch (error) {
        console.error("Error fetching roadmap:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRoadmap();
  }, [id]);

  const toggleStatus = (index) => {
    if (!roadmap) return;
    const current = progress[index] || "upcoming";
    let nextStatus = "upcoming";
    if (current === "upcoming") nextStatus = "in-progress";
    else if (current === "in-progress") nextStatus = "completed";
    else if (current === "completed") nextStatus = "upcoming";

    const newProgress = { ...progress, [index]: nextStatus };
    setProgress(newProgress);
    localStorage.setItem(`roadmap_progress_${roadmap._id}`, JSON.stringify(newProgress));
  };

  const markAllComplete = () => {
    const newProgress = {};
    roadmap.steps.forEach((_, i) => { newProgress[i] = "completed"; });
    setProgress(newProgress);
    localStorage.setItem(`roadmap_progress_${roadmap._id}`, JSON.stringify(newProgress));
  };

  const togglePdfComplete = () => {
    const newStatus = !pdfCompleted;
    setPdfCompleted(newStatus);
    localStorage.setItem(`roadmap_pdf_completed_${roadmap._id}`, JSON.stringify(newStatus));
  };

  const getPdfUrl = (url) => {
    if (!url) return "";
    let finalUrl = resolveMediaUrl(url);
    if (!finalUrl.toLowerCase().endsWith(".pdf")) {
      finalUrl = `${finalUrl}.pdf`;
    }
    return finalUrl;
  };

  const handleDownloadPDF = () => {
    setIsDownloading(true);
    try {
      const doc = new jsPDF();
      const pageWidth = doc.internal.pageSize.getWidth();
      
      doc.setFillColor(23, 23, 23);
      doc.rect(0, 0, pageWidth, 40, 'F');
      
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(24);
      doc.setFont("helvetica", "bold");
      doc.text("LearnFlow", 15, 20);
      
      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text("Learning Roadmap & Guide", 15, 28);

      doc.setTextColor(23, 23, 23);
      doc.setFontSize(20);
      doc.setFont("helvetica", "bold");
      doc.text(roadmap.title, 15, 55);

      doc.setFontSize(11);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(82, 82, 82);
      const splitDesc = doc.splitTextToSize(roadmap.description, pageWidth - 30);
      doc.text(splitDesc, 15, 65);

      let yPos = 65 + (splitDesc.length * 6) + 15;

      roadmap.steps.forEach((step, index) => {
        if (yPos > 260) {
          doc.addPage();
          yPos = 20;
        }

        doc.setFillColor(245, 245, 245);
        doc.circle(20, yPos - 3, 5, 'F');
        doc.setTextColor(23, 23, 23);
        doc.setFontSize(10);
        doc.setFont("helvetica", "bold");
        doc.text(`${index + 1}`, 19, yPos - 1);

        doc.setFontSize(14);
        doc.text(step.title, 30, yPos);

        doc.setFontSize(10);
        doc.setFont("helvetica", "normal");
        doc.setTextColor(82, 82, 82);
        const splitStepDesc = doc.splitTextToSize(step.description, pageWidth - 40);
        doc.text(splitStepDesc, 30, yPos + 6);

        doc.setFontSize(9);
        doc.setTextColor(115, 115, 115);
        doc.text(`Duration: ${step.duration}  |  Level: ${step.difficulty}`, 30, yPos + 6 + (splitStepDesc.length * 4.5) + 3);

        doc.setDrawColor(229, 229, 229);
        doc.line(15, yPos + 6 + (splitStepDesc.length * 4.5) + 8, pageWidth - 15, yPos + 6 + (splitStepDesc.length * 4.5) + 8);

        yPos += 6 + (splitStepDesc.length * 4.5) + 18;
      });

      doc.save(`${roadmap.title.replace(/\s+/g, '_')}_LearnFlow.pdf`);
    } catch (error) {
      console.error("Failed to generate PDF", error);
      alert("Failed to generate PDF.");
    } finally {
      setIsDownloading(false);
    }
  };

  if (loading) return <div className="p-12 text-center text-neutral-500">Loading roadmap...</div>;
  if (!roadmap) return <div className="p-12 text-center text-neutral-500">Roadmap not found.</div>;

  const totalSteps = roadmap.steps?.length || 0;
  const completedCount = Object.values(progress).filter(s => s === "completed").length;
  const inProgressCount = Object.values(progress).filter(s => s === "in-progress").length;
  const upcomingCount = totalSteps - completedCount - inProgressCount;
  const progressPercent = totalSteps > 0 ? Math.round((completedCount / totalSteps) * 100) : 0;
  
  const totalHours = roadmap.steps?.reduce((acc, step) => {
    const match = step.duration?.match(/(\d+)/);
    return acc + (match ? parseInt(match[1]) : 2);
  }, 0) || 0;

  const pdfUrl = getPdfUrl(roadmap.pdfUrl);

  return (
    <div className="bg-[#f8f9fa] min-h-screen pb-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <Link to="/roadmap" className="inline-flex items-center gap-1.5 text-sm font-medium text-neutral-600 hover:text-neutral-900 mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to all roadmaps
        </Link>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-neutral-900 mb-2">
              {roadmap.title}
            </h1>
            <p className="text-neutral-600">{roadmap.description}</p>
          </div>
          
          {roadmap.contentType === 'text' && (
             <button 
               onClick={handleDownloadPDF}
               disabled={isDownloading}
               className="inline-flex items-center gap-2 rounded-xl bg-white border border-neutral-200 px-5 py-2.5 text-sm font-medium text-neutral-900 shadow-sm hover:bg-neutral-50 transition-colors disabled:opacity-50"
             >
               <Download className="h-4 w-4" /> 
               {isDownloading ? "Generating..." : "Download PDF"}
             </button>
          )}
        </div>

        {roadmap.contentType === 'pdf' ? (
           /* PDF View for Uploaded PDFs */
           <div className="space-y-6">
             <div className="bg-white rounded-3xl border border-neutral-100 p-6 sm:p-8 shadow-sm">
               <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <div>
                    <h3 className="text-xl font-semibold text-neutral-900 mb-1">Roadmap Document</h3>
                    <p className="text-sm text-neutral-500">Read the document below or download a copy.</p>
                  </div>
                  <a 
                    href={pdfUrl} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    download={`${roadmap.title.replace(/\s+/g, '_')}.pdf`}
                    className="inline-flex items-center gap-2 rounded-xl bg-neutral-900 px-5 py-2.5 text-sm font-medium text-white hover:bg-neutral-800 self-start sm:self-auto"
                  >
                    <Download className="h-4 w-4" /> Download PDF
                  </a>
               </div>
               
               <div className="w-full h-[600px] rounded-xl overflow-hidden border border-neutral-200 bg-neutral-100">
                 <iframe 
                   src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`} 
                   className="w-full h-full" 
                   title="Roadmap PDF"
                 />
               </div>
             </div>

             {/* PDF Completion Card */}
             <div className="rounded-3xl border border-neutral-100 bg-white p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                   <h3 className="text-lg font-semibold text-neutral-900 flex items-center gap-2">
                     {pdfCompleted ? <CheckCircle className="h-5 w-5 text-green-600" /> : <Circle className="h-5 w-5 text-neutral-400" />}
                     {pdfCompleted ? "You have completed this Roadmap!" : "Finished reading?"}
                   </h3>
                   <p className="text-sm text-neutral-500 mt-1">
                     {pdfCompleted ? "Great job! Your progress is saved." : "Mark this document as complete to track your progress."}
                   </p>
                </div>
                <button
                  onClick={togglePdfComplete}
                  className={`w-full sm:w-auto flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-medium transition-colors ${
                    pdfCompleted 
                      ? "bg-green-50 text-green-700 border border-green-200 hover:bg-green-100" 
                      : "bg-neutral-900 text-white hover:bg-neutral-800"
                  }`}
                >
                  <CheckCircle className="h-4 w-4" /> 
                  {pdfCompleted ? "Marked as Complete" : "Mark Roadmap as Complete"}
                </button>
             </div>
           </div>
        ) : (
          /* Interactive Timeline */
          <>
            <div className="relative space-y-4 mb-8">
              <div className="absolute left-[28px] sm:left-[32px] top-10 bottom-10 w-0.5 bg-neutral-200" />

              {roadmap.steps.map((step, idx) => {
                const Icon = iconMap[step.icon] || Home;
                const status = progress[idx] || "upcoming";
                const isCompleted = status === "completed";
                const isInProgress = status === "in-progress";

                return (
                  <div key={idx} className="relative flex items-start gap-4 sm:gap-6 z-10">
                    <div className="flex-shrink-0 flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center rounded-full bg-neutral-900 text-white font-semibold text-lg sm:text-xl shadow-md border-4 border-[#f8f9fa]">
                      {idx + 1}
                    </div>

                    <div className="flex-1 rounded-2xl border border-neutral-100 bg-white p-4 sm:p-6 shadow-sm">
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                        <div className="flex items-start gap-4">
                          <div className="hidden sm:flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-neutral-50 text-neutral-700">
                            <Icon className="h-6 w-6" />
                          </div>
                          <div>
                            <h3 className="text-lg sm:text-xl font-semibold text-neutral-900">{step.title}</h3>
                            <p className="text-sm sm:text-base text-neutral-600 mt-1">{step.description}</p>
                            
                            <div className="flex flex-wrap items-center gap-4 mt-3 text-xs sm:text-sm text-neutral-500 font-medium">
                              <div className="flex items-center gap-1.5">
                                <Clock className="h-4 w-4" /> {step.duration}
                              </div>
                              <div className="flex items-center gap-1.5">
                                <span className="h-1.5 w-1.5 rounded-full bg-neutral-300" /> {step.difficulty}
                              </div>
                            </div>
                          </div>
                        </div>

                        <button 
                          onClick={() => toggleStatus(idx)}
                          className={`self-start sm:self-center flex-shrink-0 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-medium transition-colors ${
                            isCompleted 
                              ? "bg-neutral-900 text-white hover:bg-neutral-800"
                              : isInProgress
                              ? "bg-neutral-100 text-neutral-700 hover:bg-neutral-200"
                              : "bg-white border border-neutral-200 text-neutral-600 hover:bg-neutral-50"
                          }`}
                        >
                          {isCompleted ? <CircleCheck className="h-4 w-4" /> : isInProgress ? <Circle className="h-4 w-4" /> : <Calendar className="h-4 w-4" />}
                          {isCompleted ? "Completed" : isInProgress ? "In Progress" : "Upcoming"}
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Progress & Summary Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="rounded-3xl border border-neutral-100 bg-white p-6 sm:p-8 shadow-sm flex flex-col items-center">
                <h3 className="text-lg font-semibold text-neutral-900 w-full mb-6 flex items-center gap-2">
                  <BarChart className="h-5 w-5" /> Your Progress
                </h3>
                
                <div className="flex flex-col sm:flex-row items-center gap-8 w-full">
                  <div className="relative w-32 h-32 flex-shrink-0">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                      <path className="text-neutral-100" strokeWidth="4" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                      <path className="text-neutral-900" strokeDasharray={`${progressPercent}, 100`} strokeWidth="4" strokeLinecap="round" stroke="currentColor" fill="none" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                      <span className="text-2xl font-bold text-neutral-900">{progressPercent}%</span>
                      <span className="text-xs font-medium text-neutral-500">Completed</span>
                    </div>
                  </div>

                  <div className="flex-1 space-y-4 w-full">
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full bg-neutral-900 flex items-center justify-center text-white"><CircleCheck className="h-3.5 w-3.5" /></div>
                        <span className="font-medium text-neutral-900">Completed</span>
                      </div>
                      <span className="font-semibold">{completedCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full border-2 border-neutral-200 flex items-center justify-center text-neutral-400"><Circle className="h-3.5 w-3.5" /></div>
                        <span className="font-medium text-neutral-900">In Progress</span>
                      </div>
                      <span className="font-semibold">{inProgressCount}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <div className="flex items-center gap-3">
                        <div className="h-6 w-6 rounded-full border border-neutral-200 flex items-center justify-center text-neutral-400"><Calendar className="h-3.5 w-3.5" /></div>
                        <span className="font-medium text-neutral-900">Upcoming</span>
                      </div>
                      <span className="font-semibold">{upcomingCount}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-3xl border border-neutral-100 bg-white p-6 sm:p-8 shadow-sm flex flex-col justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-neutral-900 w-full mb-6 flex items-center gap-2">
                    <ListTodo className="h-5 w-5" /> Roadmap Summary
                  </h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-neutral-50 rounded-2xl p-4 flex flex-col items-center text-center">
                      <span className="text-2xl font-bold text-neutral-900">{totalSteps}</span>
                      <span className="text-xs font-medium text-neutral-500">Total Steps</span>
                    </div>
                    <div className="bg-neutral-50 rounded-2xl p-4 flex flex-col items-center text-center">
                      <span className="text-2xl font-bold text-neutral-900">≈ {totalHours} Hours</span>
                      <span className="text-xs font-medium text-neutral-500">Est. Time</span>
                    </div>
                  </div>
                </div>

                <button
                  onClick={markAllComplete}
                  disabled={progressPercent === 100}
                  className="w-full flex items-center justify-center gap-2 rounded-xl bg-neutral-900 px-5 py-3 text-sm font-medium text-white hover:bg-neutral-800 disabled:opacity-50 transition-colors"
                >
                  <CheckCircle className="h-4 w-4" /> 
                  {progressPercent === 100 ? "Roadmap Completed!" : "Mark Roadmap as Complete"}
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default RoadmapDetail;