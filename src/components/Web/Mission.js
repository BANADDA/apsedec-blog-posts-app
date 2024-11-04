import { Button, Card, CardActions, CardContent, CardHeader, TextField, Typography } from '@mui/material';
import { CheckIcon, PencilIcon, XIcon } from 'lucide-react';
import React, { useState } from 'react';

const OrganizationCards = () => {
  const [vision, setVision] = useState("To become the world's leading innovative technology company, empowering people and businesses to achieve more.");
  const [mission, setMission] = useState("To create cutting-edge solutions that transform the way people work, live, and connect while maintaining the highest standards of quality and customer satisfaction.");
  const [coreValues, setCoreValues] = useState("We believe in Innovation & Excellence as our driving force, putting Customer Focus at the heart of everything we do. We uphold Integrity & Trust as our foundational principles while fostering Collaboration & Teamwork to achieve extraordinary results.");

  const [editingVision, setEditingVision] = useState(false);
  const [editingMission, setEditingMission] = useState(false);
  const [editingValues, setEditingValues] = useState(false);
  const [tempContent, setTempContent] = useState('');

  const startEditing = (type, content) => {
    setTempContent(content);
    switch (type) {
      case 'vision':
        setEditingVision(true);
        break;
      case 'mission':
        setEditingMission(true);
        break;
      case 'values':
        setEditingValues(true);
        break;
    }
  };

  const saveChanges = (type) => {
    switch (type) {
      case 'vision':
        setVision(tempContent);
        setEditingVision(false);
        break;
      case 'mission':
        setMission(tempContent);
        setEditingMission(false);
        break;
      case 'values':
        setCoreValues(tempContent);
        setEditingValues(false);
        break;
    }
  };

  const cancelEdit = (type) => {
    switch (type) {
      case 'vision':
        setEditingVision(false);
        break;
      case 'mission':
        setEditingMission(false);
        break;
      case 'values':
        setEditingValues(false);
        break;
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
      {/* Vision Card */}
      <Card className="bg-gradient-to-br from-purple-50 to-pink-50 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader
          title="Vision"
          titleTypographyProps={{ className: "text-2xl font-bold text-purple-800" }}
        />
        <CardContent className="min-h-[150px]">
          {editingVision ? (
            <TextField
              value={tempContent}
              onChange={(e) => setTempContent(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
          ) : (
            <Typography variant="body1" className="text-gray-700">{vision}</Typography>
          )}
        </CardContent>
        <CardActions className="justify-end">
          {editingVision ? (
            <>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => cancelEdit('vision')}
                startIcon={<XIcon />}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                size="small" 
                onClick={() => saveChanges('vision')}
                startIcon={<CheckIcon />}
              >
                Save
              </Button>
            </>
          ) : (
            <Button 
              variant="outlined" 
              size="small" 
              onClick={() => startEditing('vision', vision)}
              startIcon={<PencilIcon />}
            >
              Edit
            </Button>
          )}
        </CardActions>
      </Card>

      {/* Mission Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-cyan-50 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader
          title="Mission"
          titleTypographyProps={{ className: "text-2xl font-bold text-blue-800" }}
        />
        <CardContent className="min-h-[150px]">
          {editingMission ? (
            <TextField
              value={tempContent}
              onChange={(e) => setTempContent(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
          ) : (
            <Typography variant="body1" className="text-gray-700">{mission}</Typography>
          )}
        </CardContent>
        <CardActions className="justify-end">
          {editingMission ? (
            <>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => cancelEdit('mission')}
                startIcon={<XIcon />}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                size="small" 
                onClick={() => saveChanges('mission')}
                startIcon={<CheckIcon />}
              >
                Save
              </Button>
            </>
          ) : (
            <Button 
              variant="outlined" 
              size="small" 
              onClick={() => startEditing('mission', mission)}
              startIcon={<PencilIcon />}
            >
              Edit
            </Button>
          )}
        </CardActions>
      </Card>

      {/* Core Values Card */}
      <Card className="bg-gradient-to-br from-green-50 to-emerald-50 shadow-lg hover:shadow-xl transition-shadow">
        <CardHeader
          title="Core Values"
          titleTypographyProps={{ className: "text-2xl font-bold text-green-800" }}
        />
        <CardContent className="min-h-[150px]">
          {editingValues ? (
            <TextField
              value={tempContent}
              onChange={(e) => setTempContent(e.target.value)}
              multiline
              rows={4}
              fullWidth
            />
          ) : (
            <Typography variant="body1" className="text-gray-700">{coreValues}</Typography>
          )}
        </CardContent>
        <CardActions className="justify-end">
          {editingValues ? (
            <>
              <Button 
                variant="outlined" 
                size="small" 
                onClick={() => cancelEdit('values')}
                startIcon={<XIcon />}
              >
                Cancel
              </Button>
              <Button 
                variant="contained" 
                size="small" 
                onClick={() => saveChanges('values')}
                startIcon={<CheckIcon />}
              >
                Save
              </Button>
            </>
          ) : (
            <Button 
              variant="outlined" 
              size="small" 
              onClick={() => startEditing('values', coreValues)}
              startIcon={<PencilIcon />}
            >
              Edit
            </Button>
          )}
        </CardActions>
      </Card>
    </div>
  );
};

export default OrganizationCards;
