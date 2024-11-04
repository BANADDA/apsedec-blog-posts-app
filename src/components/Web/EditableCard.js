import { Button, Card, CardContent, TextField } from '@mui/material';
import { Check, Pencil, X } from 'lucide-react';
import React, { useState } from 'react';

const EditableCard = ({ title, description, icon, onSave }) => {
  const [editableTitle, setEditableTitle] = useState(title || "");
  const [editableDescription, setEditableDescription] = useState(description);
  const [editing, setEditing] = useState(false);

  const handleSave = () => {
    onSave({ title: editableTitle, description: editableDescription });
    setEditing(false);
  };

  const handleCancel = () => {
    setEditableTitle(title || "");
    setEditableDescription(description);
    setEditing(false);
  };

  return (
    <Card className="w-full p-4">
      <CardContent className="space-y-4 text-center">
        
        {/* Title Section (conditionally rendered) */}
        {title && (editing ? (
          <TextField
            value={editableTitle}
            onChange={(e) => setEditableTitle(e.target.value)}
            placeholder="Enter title..."
            fullWidth
            className="text-2xl font-semibold"
          />
        ) : (
          <h2 className="text-xl font-semibold">{editableTitle}</h2>
        ))}
        
        {/* Description Section */}
        {editing ? (
          <TextField
            value={editableDescription}
            onChange={(e) => setEditableDescription(e.target.value)}
            placeholder="Enter description..."
            fullWidth
            multiline
            rows={4}
          />
        ) : (
          <p className="text-gray-700">{editableDescription}</p>
        )}
        
        {/* Action Buttons */}
        <div className="flex justify-center mt-4 gap-2">
          {editing ? (
            <>
              <Button
                variant="outlined"
                color="secondary"
                onClick={handleCancel}
                size="small"
              >
                <X className="w-4 h-4 mr-1" />
                Cancel
              </Button>
              <Button
                variant="contained"
                color="primary"
                onClick={handleSave}
                size="small"
              >
                <Check className="w-4 h-4 mr-1" />
                Save
              </Button>
            </>
          ) : (
            <Button
              variant="outlined"
              size="small"
              onClick={() => setEditing(true)}
            >
              <Pencil className="w-4 h-4 mr-1" />
              Edit
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default EditableCard;
