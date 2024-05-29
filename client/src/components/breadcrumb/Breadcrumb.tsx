import "./Breadcrumb.scss";

type BreadcrumbProps = {
  categories: string[],
};

/**
 * Breadcrumb component that is shown at the top of the search and item pages.
 */
const Breadcrumb = ({
  categories
}: BreadcrumbProps) => {
  return (
    <div className="breadcrumb">
      {categories.length > 0 && (
        <ol aria-label="Listado de categorías en orden descendiente">
          {categories.map((category, idx) => {
            // Check if this is the last category of the breadcrumb
            const isLastCategory = categories.length === idx + 1;

            return (
              <li key={idx}>
                <span className={isLastCategory ? "active" : ""}>{category}</span>
                {!isLastCategory && (
                  // If not last add ">" symbol
                  <span className="divisor" aria-hidden>&gt;</span>
                )}
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
};

export default Breadcrumb;