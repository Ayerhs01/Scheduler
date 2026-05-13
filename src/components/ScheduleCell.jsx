function ScheduleCell({
    day,
    time,
    tasks,
    openCategory,
    setOpenCategory,
    addSubcategory,
    addItemToSubcategory,
    deleteItem,
    deleteCategory,
}) {

    const cellId = `${day}-${time}`;

    return (
        <div className="cell-wrapper" key={cellId}>
            <div className="subcategory-buttons">
                {tasks[cellId]?.subcategories?.map((category) => (
                    
                    /**------------------------------------------ */
                    <div 
                        key={category.name} 
                        className="subcategory-group">

                        <button className="subcategory-btn"
                            onClick={() =>
                            setOpenCategory(
                                openCategory === 
                                `${cellId}-${category.name}` ? null:
                                `${cellId}-${category.name}`)} >
                            {category.name}
                        </button>

                        {/**---------------------------------------*/}
                        {openCategory === 
                            `${cellId}-${category.name}` && (
                            <div className="subcategory-panel">
                                <div 
                                    className="subcategory-header">
                                    
                                    <h4 
                                    className="subcategory-title">
                                    {category.name}
                                    </h4>
                                </div>

                                {(category.items||[]).map((item, index) => (
                                    
                                    <div 
                                    className="routine-item" 
                                    key={index}>
                                    <span className="r-bullet">•</span>
                                    <span className="r-text">{item}</span>
                                    <button 
                                    className="del-item-btn"
                                    onClick={() =>
                                        deleteItem(day, time, category.name, index)
                                    }
                                    >
                                        
                                    </button>
                                    </div>
                                    
                                ))}

                                <button
                                    className="add-item-btn"
                                    onClick={() => 
                                    addItemToSubcategory(day, time, category.name)}
                                >
                                    + Add item
                                </button>
                                    
                            
                                <button
                                    className="del-category-btn"
                                    onClick={() => deleteCategory(day, time, category.name)}>
                                    Delete Category
                                </button>

                            </div>
                        )}
                    </div>
                ))}


                {/**------------------------------------------ */}
                <button
                    className="add-subcategory-btn"
                    onClick={() => addSubcategory(day, time)}
                >
                    +
                </button>
            </div>
        </div>
    );
}

export default ScheduleCell;