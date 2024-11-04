import { doc, onSnapshot, setDoc } from 'firebase/firestore';
import { BarChart2, Briefcase, CheckCircle, Globe, Info, Lightbulb, Star, Users } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { db } from '../../firebase-config';
import EditableCard from './EditableCard';

const iconMap = {
  Star: <Star />,
  Globe: <Globe />,
  Users: <Users />,
  Briefcase: <Briefcase />,
  BarChart2: <BarChart2 />,
  Info: <Info />,
  Lightbulb: <Lightbulb />,
  CheckCircle: <CheckCircle className="text-green-500 w-6 h-6" />,
};

const EditableContentScreen = () => {
  const [editableData, setEditableData] = useState(null);

  useEffect(() => {
    // saveInitialData();
    const unsubscribe = onSnapshot(doc(db, "APSEDECContent", "contentData"), (doc) => {
      if (doc.exists()) {
        setEditableData(doc.data());
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async (section, index, updatedData) => {
    const updatedSectionData = editableData[section].map((item, idx) =>
      idx === index ? { ...item, ...updatedData } : item
    );

    const newData = { ...editableData, [section]: updatedSectionData };

    try {
      await setDoc(doc(db, "APSEDECContent", "contentData"), newData);
      console.log("Data updated successfully");
    } catch (error) {
      console.error("Error updating data: ", error);
    }
  };

  if (!editableData) return <div>Loading...</div>;

  return (
    <div className="min-h-screen bg-gray-50 p-6 space-y-10">
      <h1 className="text-3xl font-bold text-center">Home</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {editableData.featuresData.map((feature, index) => (
          <EditableCard
            key={`feature-${index}`}
            title={feature.title}
            description={feature.description}
            icon={iconMap[feature.icon]}
            onSave={(updatedData) => handleSave('featuresData', index, updatedData)}
          />
        ))}
        {editableData.backgrounds.map((background, index) => (
          <EditableCard
            key={`background-${index}`}
            title={background.title}
            description={background.description}
            icon={iconMap[background.icon]}
            onSave={(updatedData) => handleSave('backgrounds', index, updatedData)}
          />
        ))}
        <EditableCard
          title={editableData.whoWeAreData.title}
          description={editableData.whoWeAreData.description}
          icon={iconMap["Users"]}
          onSave={(updatedData) =>
            setEditableData((prev) => ({ ...prev, whoWeAreData: updatedData }))
          }
        />
        <EditableCard
          title={editableData.headerData.title}
          description={editableData.headerData.description}
          icon={iconMap["Info"]}
          onSave={(updatedData) =>
            setEditableData((prev) => ({ ...prev, headerData: updatedData }))
          }
        />
        {editableData.managementData.map((management, index) => (
          <EditableCard
            key={`management-${index}`}
            title={management.title}
            description={management.description}
            icon={iconMap[management.icon]}
            onSave={(updatedData) => handleSave('managementData', index, updatedData)}
          />
        ))}
        {editableData.servicesData.map((service, index) => (
          <EditableCard
            key={`service-${index}`}
            title={service.title}
            description={service.description}
            icon={iconMap[service.icon]}
            onSave={(updatedData) => handleSave('servicesData', index, updatedData)}
          />
        ))}
        {editableData.contactData.map((contact, index) => (
          <EditableCard
            key={`contact-${index}`}
            title={contact.title}
            description={contact.description}
            icon={iconMap[contact.icon]}
            onSave={(updatedData) => handleSave('contactData', index, updatedData)}
          />
        ))}
      </div>

      <h1 className="text-3xl font-bold text-center">About Us</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {editableData.aboutUsData.map((about, index) => (
          <EditableCard
            key={`about-${index}`}
            title={about.title}
            description={about.description}
            icon={iconMap[about.icon]}
            onSave={(updatedData) => handleSave('aboutUsData', index, updatedData)}
          />
        ))}
      </div>

      <h1 className="text-3xl font-bold text-center mt-10">Our Objectives</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {editableData.objectivesData.map((objective, index) => (
          <EditableCard
            key={`objective-${index}`}
            description={objective.description}
            icon={iconMap["CheckCircle"]}
            onSave={(updatedData) => handleSave('objectivesData', index, updatedData)}
          />
        ))}
      </div>
    </div>
  );
};

export default EditableContentScreen;
