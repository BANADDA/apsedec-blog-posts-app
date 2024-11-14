import { doc, getDoc, setDoc } from 'firebase/firestore';
import { Briefcase, Building2, Eye, Loader2, Save, Shield, Users } from 'lucide-react';
import { useEffect, useState } from 'react';
import { db } from '../../firebase-config';

const EditableContentScreen = () => {
  const [sections, setSections] = useState({
    whoWeAre: { title: "", content: "" },
    hero: { title: "", subtitle: "", content: "" },
    management: { title: "", subtitle: "", content: "" },
    ceoMessage: { name: "", title: "", message: "" },
    services: { title: "", subtitle: "", description: "", servicesList: [] },
    about: {
      hero: { title: "", backgroundImage: "" },
      mission: { title: "", content: "" },
      vision: { title: "", content: "" },
      objectives: { title: "", list: [] },
      team: { title: "", content: "" }
    }
  });

  const [isSaving, setIsSaving] = useState(false);
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    const fetchContent = async () => {
      try {
        const whoWeAreDoc = await getDoc(doc(db, "apsedecContent", "whoWeAre"));
        const heroDoc = await getDoc(doc(db, "apsedecContent", "hero"));
        const managementDoc = await getDoc(doc(db, "apsedecContent", "management"));
        const ceoMessageDoc = await getDoc(doc(db, "apsedecContent", "ceoMessage"));
        const servicesDoc = await getDoc(doc(db, "apsedecContent", "services"));
        const aboutDoc = await getDoc(doc(db, "apsedecContent", "about"));

        setSections({
          whoWeAre: whoWeAreDoc.exists() ? whoWeAreDoc.data() : sections.whoWeAre,
          hero: heroDoc.exists() ? heroDoc.data() : sections.hero,
          management: managementDoc.exists() ? managementDoc.data() : sections.management,
          ceoMessage: ceoMessageDoc.exists() ? ceoMessageDoc.data() : sections.ceoMessage,
          services: servicesDoc.exists() ? servicesDoc.data() : sections.services,
          about: aboutDoc.exists() ? aboutDoc.data() : sections.about,
        });
      } catch (error) {
        console.error("Error fetching content:", error);
      }
    };

    fetchContent();
  }, []);

  const handleSave = async () => {
    setIsSaving(true);
    console.log("Starting save process...");

    try {
      const promises = Object.keys(sections).map(async (sectionKey) => {
        const sectionData = sections[sectionKey];
        const docRef = doc(db, "apsedecContent", sectionKey);

        console.log(`Saving section: ${sectionKey}`, sectionData);

        await setDoc(docRef, sectionData);
        console.log(`Section ${sectionKey} saved successfully.`);
      });

      await Promise.all(promises);

      console.log("All sections saved successfully.");
      setNotification({
        type: 'success',
        message: 'Content successfully saved!'
      });
    } catch (error) {
      console.error("Error saving content to Firestore:", error);
      setNotification({
        type: 'error',
        message: 'Failed to save content. Please try again.'
      });
    } finally {
      console.log("Save process completed.");
      setIsSaving(false);
      setTimeout(() => setNotification(null), 3000);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      {notification && (
        <div className={`fixed top-4 right-4 p-4 rounded-lg shadow-lg transition-all duration-300 transform ${
          notification.type === 'success' ? 'bg-green-500' : 'bg-red-500'
        } text-white max-w-md animate-slide-in-right`}>
          {notification.message}
        </div>
      )}

      <nav className="bg-white shadow-lg rounded-xl mb-8 p-4 transition-all duration-300 hover:shadow-xl">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
            APSEDEC CMS
          </h1>
          <button
            onClick={handleSave}
            disabled={isSaving}
            className={`flex items-center px-6 py-3 bg-gradient-to-r from-green-600 to-green-500 text-white rounded-lg shadow-lg transition-all duration-300 ${
              isSaving ? 'opacity-75 cursor-not-allowed' : 'hover:from-green-700 hover:to-green-600'
            }`}
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              <Save className="mr-2 h-5 w-5" />
            )}
            {isSaving ? 'Saving...' : 'Save All Changes'}
          </button>
        </div>
      </nav>

      {/* Render sections like "Hero", "Who We Are", "Services", etc., using `sections` state */}
      {/* Example: Hero Section */}
      <section className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="border-l-4 border-l-blue-500 h-full">
          <div className="p-6">
            <h2 className="flex items-center text-2xl font-semibold text-gray-800 mb-4">
              <Building2 className="h-7 w-7 text-blue-600 mr-3" />
              Hero Section
            </h2>
            <input
              value={sections.hero.title}
              onChange={(e) => setSections({...sections, hero: {...sections.hero, title: e.target.value}})}
              className="w-full p-3 mb-4 rounded-lg border border-gray-200 font-bold focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
            <textarea
              value={sections.hero.content}
              onChange={(e) => setSections({...sections, hero: {...sections.hero, content: e.target.value}})}
              className="w-full min-h-[150px] p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Render other sections similarly by accessing `sections` state */}
      <section className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="border-l-4 border-l-green-500 h-full">
          <div className="p-6">
            <h2 className="flex items-center text-2xl font-semibold text-gray-800 mb-4">
              <Users className="h-7 w-7 text-green-600 mr-3" />
              Who We Are
            </h2>
            <textarea
              value={sections.whoWeAre.content}
              onChange={(e) => setSections({...sections, whoWeAre: {...sections.whoWeAre, content: e.target.value}})}
              className="w-full min-h-[200px] p-4 rounded-lg border border-gray-200 focus:ring-2 focus:ring-green-500 focus:border-transparent resize-none transition-all duration-300"
            />
          </div>
        </div>
      </section>

      {/* Repeat similar structure for Services, Management, CEO Message, About sections */}
      {/* Example: Services Section */}
      <section className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl">
        <div className="border-l-4 border-l-purple-500 h-full">
          <div className="p-6">
            <h2 className="flex items-center text-2xl font-semibold text-gray-800 mb-4">
              <Briefcase className="h-7 w-7 text-purple-600 mr-3" />
              Our Services
            </h2>
            <input
              value={sections.services.subtitle}
              onChange={(e) => setSections({...sections, services: {...sections.services, subtitle: e.target.value}})}
              className="w-full p-3 mb-4 rounded-lg border border-gray-200 font-bold focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
            />
            <textarea
              value={sections.services.description}
              onChange={(e) => setSections({...sections, services: {...sections.services, description: e.target.value}})}
              className="w-full min-h-[100px] p-4 mb-6 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-300"
            />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {sections.services.servicesList.map((service, index) => (
                <div key={index} className="bg-gray-50 rounded-lg p-4 shadow-md hover:shadow-lg transition-all duration-300">
                  <input
                    value={service.title}
                    onChange={(e) => {
                      const newServices = [...sections.services.servicesList];
                      newServices[index] = {...service, title: e.target.value};
                      setSections({...sections, services: {...sections.services, servicesList: newServices}});
                    }}
                    className="w-full p-2 mb-2 rounded-md border border-gray-200 font-bold focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-300"
                  />
                  <textarea
                    value={service.description}
                    onChange={(e) => {
                      const newServices = [...sections.services.servicesList];
                      newServices[index] = {...service, description: e.target.value};
                      setSections({...sections, services: {...sections.services, servicesList: newServices}});
                    }}
                    className="w-full min-h-[100px] p-2 rounded-md border border-gray-200 focus:ring-2 focus:ring-purple-500 focus:border-transparent resize-none transition-all duration-300"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      

      {/* Management Section */}
      <section className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-l-4 border-l-blue-500">
          <div className="p-6">
            <h2 className="flex items-center text-2xl font-semibold text-gray-800 mb-4">
              <Shield className="h-7 w-7 text-blue-600 mr-3" />
              Management Section
            </h2>
            <input
              value={sections.management.title}
              onChange={(e) => setSections({...sections, management: {...sections.management, title: e.target.value}})}
              className="w-full p-3 mb-4 rounded-lg border border-gray-200 font-bold focus:ring-2 focus:ring-blue-500"
            />
            <textarea
              value={sections.management.content}
              onChange={(e) => setSections({...sections, management: {...sections.management, content: e.target.value}})}
              className="w-full min-h-[100px] p-4 rounded-lg border border-gray-200 resize-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>
      </section>

      {/* CEO Message Section */}
      <section className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-l-4 border-l-green-500">
          <div className="p-6">
            <h2 className="flex items-center text-2xl font-semibold text-gray-800 mb-4">
              <Users className="h-7 w-7 text-green-600 mr-3" />
              CEO Message
            </h2>
            <input
              value={sections.ceoMessage.name}
              onChange={(e) => setSections({...sections, ceoMessage: {...sections.ceoMessage, name: e.target.value}})}
              className="w-full p-3 mb-4 rounded-lg border border-gray-200 font-bold focus:ring-2 focus:ring-green-500"
            />
            <textarea
              value={sections.ceoMessage.message}
              onChange={(e) => setSections({...sections, ceoMessage: {...sections.ceoMessage, message: e.target.value}})}
              className="w-full min-h-[100px] p-4 rounded-lg border border-gray-200 resize-none focus:ring-2 focus:ring-green-500"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="border-l-4 border-l-purple-500">
          <div className="p-6">
            <h2 className="flex items-center text-2xl font-semibold text-gray-800 mb-4">
              <Eye className="h-7 w-7 text-purple-600 mr-3" />
              About Section
            </h2>
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Mission</h3>
              <textarea
                value={sections.about.mission.content}
                onChange={(e) => setSections({...sections, about: {...sections.about, mission: {...sections.about.mission, content: e.target.value}}})}
                className="w-full min-h-[80px] p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Vision</h3>
              <textarea
                value={sections.about.vision.content}
                onChange={(e) => setSections({...sections, about: {...sections.about, vision: {...sections.about.vision, content: e.target.value}}})}
                className="w-full min-h-[80px] p-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500"
              />
            </div>
            <div className="mb-6">
              <h3 className="text-lg font-semibold">Objectives</h3>
              {sections.about.objectives.list.map((item, index) => (
                <input
                  key={index}
                  value={item}
                  onChange={(e) => {
                    const newObjectives = [...sections.about.objectives.list];
                    newObjectives[index] = e.target.value;
                    setSections({...sections, about: {...sections.about, objectives: {...sections.about.objectives, list: newObjectives}}});
                  }}
                  className="w-full p-2 mb-2 rounded-lg border border-gray-200 focus:ring-2 focus:ring-purple-500"
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <style jsx global>{`
        @keyframes slideInRight {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }
        
        .animate-slide-in-right {
          animation: slideInRight 0.3s ease-out;
        }
      `}</style>
    </div>
  );
};

export default EditableContentScreen;
