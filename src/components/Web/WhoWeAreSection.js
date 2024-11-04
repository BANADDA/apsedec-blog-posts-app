import { Button, Card, CardContent, TextField } from '@mui/material';
import { Check, Pencil, X } from 'lucide-react';
import React, { useState } from 'react';

const WhoWeAreSection = ({ title, description, onSave }) => {
  const [editableTitle, setEditableTitle] = useState(title);
  const [editableDescription, setEditableDescription] = useState(description);
  const [editing, setEditing] = useState({ title: false, description: false });

  const handleSave = (field) => {
    onSave({ title: editableTitle, description: editableDescription });
    setEditing({ ...editing, [field]: false });
  };

  const handleCancel = (field) => {
    if (field === 'title') {
      setEditableTitle(title);
    } else if (field === 'description') {
      setEditableDescription(description);
    }
    setEditing({ ...editing, [field]: false });
  };

  return (
    <Card className="w-full">
      <CardContent className="p-6 space-y-6">
        {/* Title Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-4">
            {editing.title ? (
              <TextField
                value={editableTitle}
                onChange={(e) => setEditableTitle(e.target.value)}
                className="text-2xl font-semibold"
                placeholder="Enter title..."
                fullWidth
              />
            ) : (
              <h1 className="text-2xl font-semibold text-gray-900">
                {editableTitle || "Click to add title..."}
              </h1>
            )}
            <div className="flex gap-2">
              {editing.title ? (
                <>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => handleCancel('title')}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    size="small"
                    onClick={() => handleSave('title')}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setEditing({ ...editing, title: true })}
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </div>

        {/* Description Section */}
        <div className="space-y-4">
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1">
              {editing.description ? (
                <TextField
                  value={editableDescription}
                  onChange={(e) => setEditableDescription(e.target.value)}
                  className="text-gray-700"
                  placeholder="Enter description..."
                  fullWidth
                  multiline
                  rows={4}
                />
              ) : (
                <p className="text-gray-700 whitespace-pre-wrap">
                  {editableDescription || "Click to add description..."}
                </p>
              )}
            </div>
            <div className="flex gap-2">
              {editing.description ? (
                <>
                  <Button
                    variant="outlined"
                    color="secondary"
                    size="small"
                    onClick={() => handleCancel('description')}
                  >
                    <X className="w-4 h-4 mr-1" />
                    Cancel
                  </Button>
                  <Button
                    color="primary"
                    size="small"
                    onClick={() => handleSave('description')}
                  >
                    <Check className="w-4 h-4 mr-1" />
                    Save
                  </Button>
                </>
              ) : (
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => setEditing({ ...editing, description: true })}
                >
                  <Pencil className="w-4 h-4 mr-1" />
                  Edit
                </Button>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WhoWeAreSection;
