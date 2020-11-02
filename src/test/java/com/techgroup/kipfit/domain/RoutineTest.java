package com.techgroup.kipfit.domain;

import org.junit.jupiter.api.Test;
import static org.assertj.core.api.Assertions.assertThat;
import com.techgroup.kipfit.web.rest.TestUtil;

public class RoutineTest {

    @Test
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Routine.class);
        Routine routine1 = new Routine();
        routine1.setId(1L);
        Routine routine2 = new Routine();
        routine2.setId(routine1.getId());
        assertThat(routine1).isEqualTo(routine2);
        routine2.setId(2L);
        assertThat(routine1).isNotEqualTo(routine2);
        routine1.setId(null);
        assertThat(routine1).isNotEqualTo(routine2);
    }
}
