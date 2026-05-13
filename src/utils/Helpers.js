{/**------------------------------------------------------------ */}
{/** function that adds a subcategory to each cell*/}

export function addSubcategory(tasks, setTasks, day, time) {
    const cellId = `${day}-${time}`;
    const name = prompt("Enter subcategory name:");

    if (!name) return;

    const currentCell = tasks[cellId] || {
        text: "",
        subcategories: [],
    };

    setTasks({
        ...tasks,
        [cellId]: {
            ...currentCell,
            subcategories: [
                ...(currentCell.subcategories || []),
                {
                    name: name,
                    items: [],
                },
            ],
        }
    });
}  

{/**------------------------------------------------------------ */}

export function deleteCategory(tasks, setTasks, day, time, categoryName) {
    const cellId = `${day}-${time}`;
    const currentCell = tasks[cellId];

    const updatedSub = currentCell.subcategories.filter(
        (category) => category.name !== categoryName
    );

    setTasks({
        ...tasks,
        [cellId]: {
            ...currentCell,
            subcategories: updatedSub,
        },
    });

    if (openCategory === `${cellId}-${categoryName}`) {
        setOpenCategory(null);
    }
}

{/**------------------------------------------------------------ */}
export function addItemToSubategory(
    tasks, setTasks, day, time, categoryName) {
    
    const cellId = `${day}-${time}`;
    const item = prompt("Add items to routine:");

    if (!item) return;

    const currentCell = tasks[cellId] || {
        subcategories: [],
    };

    const updatedSub = currentCell.subcategories.map((category) => {
        if (category.name === categoryName) {
            return {
                ...category,
                items: [...(category.items || []), item],
            };
        }
        return category;
    });

    setTasks({
        ...tasks,
        [cellId]: {
            ...currentCell,
            subcategories: updatedSub,
        },
    });

}


{/**------------------------------------------------------------ */}
export function deleteItem(
    tasks, setTasks, day, time, categoryName, itemindex) {
    const cellId = `${day}-${time}`;
    const currentCell = tasks[cellId];

    const updatedSub = currentCell.subcategories.map((category) => {
        if (category.name === categoryName) {
            return {
                ...category,
                items: category.items.filter((_, index) => 
                    index !== itemindex),
            };
        }

        return category;
    });

    setTasks({
        ...tasks,
        [cellId]: {
            ...currentCell,
            subcategories: updatedSub
        }
    });
}