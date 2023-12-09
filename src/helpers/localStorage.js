// Function to set a value in localStorage
export function setLocalStorageItem(key, value) {
    try {
        localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
        console.error("Error setting localStorage item:", error);
    }
}
