package live.talentquest.service;

import org.apache.tika.Tika;
import org.apache.tika.exception.TikaException;
import org.springframework.stereotype.Service;
import org.xml.sax.SAXException;

import java.io.IOException;
import java.io.InputStream;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class KeywordExtractorService {

    private static final Tika tika = new Tika();

    public static String extractText(InputStream inputStream, String fileType) throws IOException, TikaException, SAXException {
        return tika.parseToString(inputStream);
    }

    public static Set<String> extractKeywords(String text) {
        return List.of(text.split("\\W+")).stream()
                .map(String::toLowerCase)
                .filter(word -> word.length() > 2)
                .collect(Collectors.toSet());
    }
}
