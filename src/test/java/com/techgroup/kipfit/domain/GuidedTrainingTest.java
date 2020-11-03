package com.techgroup.kipfit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.techgroup.kipfit.web.rest.TestUtil;

public class GuidedTrainingTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(GuidedTraining.class);
        GuidedTraining guidedTraining1 = new GuidedTraining();
        guidedTraining1.setId(1L);
        GuidedTraining guidedTraining2 = new GuidedTraining();
        guidedTraining2.setId(guidedTraining1.getId());
        assertThat(guidedTraining1).isEqualTo(guidedTraining2);
        guidedTraining2.setId(2L);
        assertThat(guidedTraining1).isNotEqualTo(guidedTraining2);
        guidedTraining1.setId(null);
        assertThat(guidedTraining1).isNotEqualTo(guidedTraining2);
    }
}
