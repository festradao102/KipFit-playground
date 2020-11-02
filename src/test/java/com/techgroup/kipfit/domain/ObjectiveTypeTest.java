package com.techgroup.kipfit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.techgroup.kipfit.web.rest.TestUtil;

public class ObjectiveTypeTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(ObjectiveType.class);
        ObjectiveType objectiveType1 = new ObjectiveType();
        objectiveType1.setId(1L);
        ObjectiveType objectiveType2 = new ObjectiveType();
        objectiveType2.setId(objectiveType1.getId());
        assertThat(objectiveType1).isEqualTo(objectiveType2);
        objectiveType2.setId(2L);
        assertThat(objectiveType1).isNotEqualTo(objectiveType2);
        objectiveType1.setId(null);
        assertThat(objectiveType1).isNotEqualTo(objectiveType2);
    }
}
