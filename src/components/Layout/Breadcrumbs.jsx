import React from 'react';
import { ChevronRight, Home } from 'lucide-react';
import './Breadcrumbs.css';

const Breadcrumbs = ({ items = [] }) => {
  const allItems = [
    { label: 'Inicio', path: '/', icon: Home },
    ...items
  ];

  return (
    <nav className="breadcrumbs" aria-label="Breadcrumb">
      <ol className="breadcrumbs-list">
        {allItems.map((item, index) => {
          const isLast = index === allItems.length - 1;
          const Icon = item.icon;
          
          return (
            <li key={index} className="breadcrumb-item">
              {isLast ? (
                <span className="breadcrumb-current">
                  {Icon && <Icon size={16} />}
                  <span>{item.label}</span>
                </span>
              ) : (
                <>
                  <a href={item.path} className="breadcrumb-link">
                    {Icon && <Icon size={16} />}
                    <span>{item.label}</span>
                  </a>
                  <ChevronRight size={16} className="breadcrumb-separator" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
