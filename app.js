import Segment from "segment";
import path from "path";

export default (options) => {
    const segment = new Segment();

    segment.useDefault()
        .loadStopwordDict(path.join(__dirname, "words", 'stopword.txt'));

    return async(ctx, next) => {
        ctx.queueItem.aiAnalysisResult = segment.doSegment(ctx.queueItem.responseBodyText || "", {
            stripPunctuation: true
        });

        await next();
    };
}