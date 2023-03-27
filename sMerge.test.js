// test
import sMerge from "./sMerge.js";

test ( "Test 1. Both streams empty", () => {
    const streamA = [];
    const streamB = [];
    const mergedStream = [];
    const test = sMerge(streamA, streamB);
    expect(test).toEqual(mergedStream);
})

test ( "Test 2. Stream A empty", () => {
    const streamA = [];
    const streamB = [1];
    const mergedStream = [1];
    const test = sMerge(streamA, streamB);
    expect(test).toEqual(mergedStream);
})

test ( "Test 3. Stream B empty", () => {
    const streamA = [[2,100]];
    const streamB = [];
    const mergedStream = [[2,100]];
    const test = sMerge(streamA, streamB);
    expect(test).toEqual(mergedStream);
})

test ( "Test 4. Simplest values", () => {
    const streamA = [1];
    const streamB = [3];
    const mergedStream = [1,3];
    const test = sMerge(streamA, streamB);
    expect(test).toEqual(mergedStream);
})

test ( "Test 5. Join simple ranges", () => {
    const streamA = [1];
    const streamB = [2];
    const mergedStream = [[1, 2]];
    const test = sMerge(streamA, streamB);
    expect(test).toEqual(mergedStream);
})

test ( "Test 6. Join value to range", () => {
    const streamA = [3];
    const streamB = [[4, 10]];
    const mergedStream = [[3, 10]];
    const test = sMerge(streamA, streamB);
    expect(test).toEqual(mergedStream);
})

test ( "Test 7. Join value to overlap range", () => {
    const streamA = [3];
    const streamB = [[3, 10]];
    const mergedStream = [[3, 10]];
    const test = sMerge(streamA, streamB);
    expect(test).toEqual(mergedStream);
})

test ( "Test 8. Complex overlap", () => {
    const streamA = [1, [3, 200], 505];
    const streamB = [10, 20, 30, [50, 500]];
    const mergedStream = [1, [3,500], 505];
    const test = sMerge(streamA, streamB);
    expect(test).toEqual(mergedStream);
})

test ( "Test 9. Do we need the 1,2,3 input restriction?", () => {
    const streamA = [1, 2, [3, 200], 505];
    const streamB = [10, 20, 30, [50, 500]];
    const mergedStream = [[1, 500], 505];
    const test = sMerge(streamA, streamB);
    expect(test).toEqual(mergedStream);
})

test ( "Test 10. Actual inputs from the coding session", () => {
    const streamA = [5, 7, 9, 11];
    const streamB = [[8, 15]];
    const mergedStream = [5, [7, 15]];
    const test = sMerge(streamA, streamB);
    expect(test).toEqual(mergedStream);
})

test ( "Test 11. Actual inputs from the coding session", () => {
    const streamA = [2, 4, 6, 8];
    const streamB = [2, 4, 6, 8, 9];
    const mergedStream = [2, 4, 6, [8, 9]];
    const test = sMerge(streamA, streamB);
    expect(test).toEqual(mergedStream);
})

// extended tests for other than two streams

test ( "Test 12. Zero streams", () => {
    const mergedStream = [];
    const test = sMerge();
    expect(test).toEqual(mergedStream);
})

test ( "Test 13. One stream", () => {
    const streamA = [2, 4, 6, 7, 8, 9];
    const mergedStream = [2, 4, [6, 9]];
    const test = sMerge(streamA);
    expect(test).toEqual(mergedStream);
})

test ( "Test 14. Four streams, including an empty one, and honoring the 5 to 1 trillion range example", () => {
    const streamA = [2, 4, [5,1000000000000]];
    const streamB = [];
    const streamC = [1, [3,10],1000000000002]
    const streamD = [[1000,5000], 900000000000]
    const mergedStream = [[1,1000000000000], 1000000000002];
    const test = sMerge(streamA, streamB, streamC, streamD);
    expect(test).toEqual(mergedStream);
})



