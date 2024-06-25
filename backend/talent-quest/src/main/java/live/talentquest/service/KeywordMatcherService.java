package live.talentquest.service;

import java.util.HashSet;
import java.util.Set;

public class KeywordMatcherService {
    public static double calculateMatchScore(Set<String> cvKeywords, Set<String> jobDescriptionKeywords) {
        if (jobDescriptionKeywords.isEmpty()) {
            return 0;
        }

        Set<String> intersection = new HashSet<>(cvKeywords);
        intersection.retainAll(jobDescriptionKeywords);

        double matchRatio = (double) intersection.size() / jobDescriptionKeywords.size();
        return Math.min(matchRatio * 10, 10); // Scale the score to be from 0 to 10, cap at 10
    }
}
