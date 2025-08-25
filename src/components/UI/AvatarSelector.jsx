import React, { useState } from 'react'
import { Check } from 'lucide-react'
import './AvatarSelector.css'

const AvatarSelector = ({ onAvatarSelect, currentAvatar = null }) => {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar)

  // 10 animalitos tiernos usando identicon con formas redondeadas
  const [avatars, setAvatars] = useState([
    {
      id: 1,
      url: 'https://api.dicebear.com/6.x/identicon/svg?seed=puppy&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf&scale=70&radius=50',
      name: 'Cachorro'
    },
    {
      id: 2,
      url: 'https://api.dicebear.com/6.x/identicon/svg?seed=kitten&backgroundColor=ffd5dc,b6e3f4,c0aede,d1d4f9,ffdfbf&scale=70&radius=50',
      name: 'Gatito'
    },
    {
      id: 3,
      url: 'https://api.dicebear.com/6.x/identicon/svg?seed=bunny&backgroundColor=c0aede,d1d4f9,ffd5dc,b6e3f4,ffdfbf&scale=70&radius=50',
      name: 'Conejito'
    },
    {
      id: 4,
      url: 'https://api.dicebear.com/6.x/identicon/svg?seed=panda&backgroundColor=d1d4f9,ffd5dc,b6e3f4,c0aede,ffdfbf&scale=70&radius=50',
      name: 'Panda'
    },
    {
      id: 5,
      url: 'https://api.dicebear.com/6.x/identicon/svg?seed=koala&backgroundColor=ffdfbf,b6e3f4,c0aede,d1d4f9,ffd5dc&scale=70&radius=50',
      name: 'Koala'
    },
    {
      id: 6,
      url: 'https://api.dicebear.com/6.x/identicon/svg?seed=penguin&backgroundColor=b6e3f4,ffdfbf,c0aede,d1d4f9,ffd5dc&scale=70&radius=50',
      name: 'Pingüino'
    },
    {
      id: 7,
      url: 'https://api.dicebear.com/6.x/identicon/svg?seed=owl&backgroundColor=c0aede,b6e3f4,ffdfbf,d1d4f9,ffd5dc&scale=70&radius=50',
      name: 'Búho'
    },
    {
      id: 8,
      url: 'https://api.dicebear.com/6.x/identicon/svg?seed=fox&backgroundColor=d1d4f9,c0aede,b6e3f4,ffdfbf,ffd5dc&scale=70&radius=50',
      name: 'Zorrito'
    },
    {
      id: 9,
      url: 'https://api.dicebear.com/6.x/identicon/svg?seed=hamster&backgroundColor=b6e3f4,c0aede,ffd5dc,d1d4f9,ffdfbf&scale=70&radius=50',
      name: 'Hámster'
    },
    {
      id: 10,
      url: 'https://api.dicebear.com/6.x/identicon/svg?seed=duck&backgroundColor=ffd5dc,c0aede,b6e3f4,d1d4f9,ffdfbf&scale=70&radius=50',
      name: 'Patito'
    }
  ])

  const handleAvatarClick = (avatar) => {
    setSelectedAvatar(avatar)
  }

  const handleConfirmSelection = () => {
    if (selectedAvatar && onAvatarSelect) {
      onAvatarSelect(selectedAvatar)
    }
  }



  return (
    <div className="avatar-selector">
      <div className="avatar-selector-header">
        <h3>Selecciona tu Avatar</h3>
      </div>
      
      <div className="avatars-grid">
        {avatars.map((avatar) => (
          <div
            key={avatar.id}
            className={`avatar-option ${selectedAvatar?.id === avatar.id ? 'selected' : ''}`}
            onClick={() => handleAvatarClick(avatar)}
          >
            <img 
              src={avatar.url} 
              alt={avatar.name}
              className="avatar-image"
            />
            {selectedAvatar?.id === avatar.id && (
              <div className="avatar-check">
                <Check size={20} />
              </div>
            )}
          </div>
        ))}
      </div>
      
      {selectedAvatar && (
        <div className="avatar-selection-footer">
          <p>Avatar seleccionado: <strong>{selectedAvatar.name}</strong></p>
          <button 
            className="confirm-avatar-btn"
            onClick={handleConfirmSelection}
          >
            Confirmar Selección
          </button>
        </div>
      )}
    </div>
  )
}

export default AvatarSelector
