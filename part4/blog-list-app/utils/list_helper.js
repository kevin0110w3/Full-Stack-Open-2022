const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    const reducer = (totalLikes, blog) => {
        return totalLikes + blog.likes
    }

    return blogs.reduce(reducer, 0);
}

const favoriteBlog = (blogs) => {
    const reducer = (favorite, blog) => {
        if (favorite === null || favorite === undefined || Object.keys(favorite).length === 0) {
            return blog
        }
        if (blog.likes > favorite.likes) {
            return blog
        } else {
            return favorite
        }
    }
    return blogs.reduce(reducer, {});
}

const mostBlogs = (blogs) => {
    
    return 0;
}

const mostLikes = (blogs) => {
    
    return 0;
}

module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
}