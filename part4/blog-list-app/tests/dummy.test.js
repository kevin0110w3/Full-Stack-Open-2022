const listHelper = require('../utils/list_helper')
const test_data = require('./test_data').test_data
const _ = require('lodash')

test('dummy returns one', () => {
    const blogs = []

    const result = listHelper.dummy(blogs)
    expect(result).toBe(1)
})

describe('likes', () => {
    test('calculate number of likes for no blogs', () => {
        const blogs = []

        expect(listHelper.totalLikes(blogs)).toBe(0)
    })

    test('calculate number of likes for 1 blog', () => {
        const blogs = [
            {
                "title": "This is the way",
                "author": "Les Dennis",
                "url": "www.lesdennis.info",
                "likes": 2
            }
        ]
        expect(listHelper.totalLikes(blogs)).toBe(2)
    })

    test('calculate number of likes for more than 1 blog', () => {
        const blogs = [
            {
                "title": "This is the way",
                "author": "Les Dennis",
                "url": "www.lesdennis.info",
                "likes": 2
            },
            {
                "title": "There's no limit",
                "author": "50 cent",
                "url": "www.50cent.co.uk",
                "likes": 5
            },
        ]
        expect(listHelper.totalLikes(blogs)).toBe(7)
    })
})

describe('favoriteBlog', () => {
    const favoriteBlog = {
        "title": "This is the way",
        "author": "Les Dennis",
        "url": "www.lesdennis.info",
        "likes": 2
    }

    test('calculate favorite for no blogs', () => {
        const blogs = []

        expect(listHelper.favoriteBlog(blogs)).toEqual({})
    })

    test('calculate favorite for 1 blog', () => {
        const blogs = [
            {
                "title": "This is the way",
                "author": "Les Dennis",
                "url": "www.lesdennis.info",
                "likes": 2
            }
        ]
        
        expect(listHelper.favoriteBlog(blogs)).toEqual(favoriteBlog)
    })

    test('calculate favorite for more than 1 blog', () => {
        const blogs = [
            {
                "title": "This is the way",
                "author": "Les Dennis",
                "url": "www.lesdennis.info",
                "likes": 2
            },
            {
                "title": "There's no limit",
                "author": "50 cent",
                "url": "www.50cent.co.uk",
                "likes": 1
            },
        ]
        
        expect(listHelper.favoriteBlog(blogs)).toEqual(favoriteBlog)
    })
})
