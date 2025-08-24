import React from 'react';
import { ChevronLeft, ChevronRight, MoreHorizontal } from 'lucide-react';
import './Pagination.css';

const Pagination = ({ 
  currentPage, 
  totalPages, 
  onPageChange, 
  showPageNumbers = true,
  maxVisiblePages = 5 
}) => {
  if (totalPages <= 1) return null;

  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }

    const halfVisible = Math.floor(maxVisiblePages / 2);
    let start = Math.max(1, currentPage - halfVisible);
    let end = Math.min(totalPages, start + maxVisiblePages - 1);

    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(1, end - maxVisiblePages + 1);
    }

    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  };

  const visiblePages = getVisiblePages();
  const hasFirstPage = visiblePages[0] > 1;
  const hasLastPage = visiblePages[visiblePages.length - 1] < totalPages;

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  return (
    <nav className="pagination" aria-label="Paginación">
      <ul className="pagination-list">
        {/* Botón Anterior */}
        <li className="pagination-item">
          <button
            className={`pagination-button pagination-prev ${currentPage === 1 ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-label="Página anterior"
          >
            <ChevronLeft size={16} />
            <span>Anterior</span>
          </button>
        </li>

        {/* Primera página */}
        {hasFirstPage && (
          <>
            <li className="pagination-item">
              <button
                className="pagination-button"
                onClick={() => handlePageChange(1)}
                aria-label="Ir a la página 1"
              >
                1
              </button>
            </li>
            {visiblePages[0] > 2 && (
              <li className="pagination-item">
                <span className="pagination-ellipsis">
                  <MoreHorizontal size={16} />
                </span>
              </li>
            )}
          </>
        )}

        {/* Páginas visibles */}
        {visiblePages.map(page => (
          <li key={page} className="pagination-item">
            <button
              className={`pagination-button ${page === currentPage ? 'active' : ''}`}
              onClick={() => handlePageChange(page)}
              aria-label={`Ir a la página ${page}`}
              aria-current={page === currentPage ? 'page' : undefined}
            >
              {page}
            </button>
          </li>
        ))}

        {/* Última página */}
        {hasLastPage && (
          <>
            {visiblePages[visiblePages.length - 1] < totalPages - 1 && (
              <li className="pagination-item">
                <span className="pagination-ellipsis">
                  <MoreHorizontal size={16} />
                </span>
              </li>
            )}
            <li className="pagination-item">
              <button
                className="pagination-button"
                onClick={() => handlePageChange(totalPages)}
                aria-label={`Ir a la página ${totalPages}`}
              >
                {totalPages}
              </button>
            </li>
          </>
        )}

        {/* Botón Siguiente */}
        <li className="pagination-item">
          <button
            className={`pagination-button pagination-next ${currentPage === totalPages ? 'disabled' : ''}`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-label="Página siguiente"
          >
            <span>Siguiente</span>
            <ChevronRight size={16} />
          </button>
        </li>
      </ul>

      {/* Información de páginas */}
      <div className="pagination-info">
        <span className="pagination-text">
          Página {currentPage} de {totalPages}
        </span>
      </div>
    </nav>
  );
};

export default Pagination;
